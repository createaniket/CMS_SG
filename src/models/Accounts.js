const mongoose = require("mongoose");

// Individual payment records
const PaymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["paynow", "internetTransfer", "cheque", "cash", "other"],
    required: true
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  reference: { type: String }, // e.g. bank ref, cheque number
  notes: String
}, { _id: false });

// Main Account Schema
const AccountSchema = new mongoose.Schema({
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

  totalInvoiced: { type: Number, required: true },
  totalPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, required: true },

  payments: [PaymentSchema],

  status: {
    type: String,
    enum: ["unpaid", "partiallyPaid", "paid", "overdue"],
    default: "unpaid"
  },

  remarks: String
}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
