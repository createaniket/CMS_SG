const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Masonry Works"
  description: { type: String }, // Optional
  code: { type: String }, // Optional short code like "MS01"
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // For nested categories (optional)
  type: {
    type: String,
    enum: ["work", "service", "material", "other"],
    default: "work"
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true });

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
