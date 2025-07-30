const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["client", "vendor", "partner", "employee", "other"],
      required: true,
    },
    address : {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    website: { type: String, required: true },
    gstNumber: { type: String, unique: true, sparse: true }, // GST registration number
    bankDetails: {
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      swiftCode: { type: String, required: true },
      iban: { type: String, required: true },
    },
    notes: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
