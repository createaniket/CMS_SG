const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    roles: {
      type: [String],
      enum: ["user", "accountant", "admin"],
      default: ["user"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Method to generate JWT token and store it
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.UserTokenKey, {
    expiresIn: "7d", // Optional: Set expiry
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  console.log("Generated Token:", token);
  return token;
};

// Static method to authenticate user
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error(
      "Looks like you're not registered yet! Ready to join us? Sign up now and Expand Your Brand Demand!"
    );
  }

  if (!user.password) {
    throw new Error("This account doesn't use password login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password didn't match.");
  }

  return user;
};

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
