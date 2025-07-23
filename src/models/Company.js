const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {

    name,
    address,
    phone,
    email,
    website,
  },
  { timestamps: true }
);

const Company = mongoose.model("Account", accountSchema);
module.exports = Account;
