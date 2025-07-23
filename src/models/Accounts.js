const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  taxRate: { type: Number, default: 0 }, // % GST rate
  taxAmount: { type: Number, default: 0 }, // calculated value
  rebateAmount: { type: Number, default: 0 }, // used in project costing
  total: { type: Number, required: true }, // (quantity * rate) + tax - rebate
});

const accountTransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["invoice", "expense", "payment_in", "payment_out", "credit_note"],
      required: true,
    },
    invoiceNumber: { type: String, unique: true, sparse: true }, /// WILL BE REFERED FROM INVOICE MODEL
    referenceNumber: { type: String }, // PO No / payment ref

    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    salesmanId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    currency: { type: String, default: "SGD" },
    items: [itemSchema],

    subtotal: { type: Number, required: true },
    totalTax: { type: Number, default: 0 }, // auto calculated (sum of item.taxAmount)
    rebateTotal: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }, // subtotal + tax - rebates

    gstType: {
      type: String,
      enum: ["standard", "simplified", "exempt", "out_of_scope"],
      default: "standard",
    },

    inputTax: { type: Number, default: 0 }, // for expenses, purchases
    outputTax: { type: Number, default: 0 }, // for invoices

    status: {
      type: String,
      enum: ["paid", "unpaid", "partial", "overdue"],
      default: "unpaid",
    },

    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    paymentDate: { type: Date },

    bankAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount" },

    notes: { type: String },
  },
  { timestamps: true }
);

const AccountTransaction = mongoose.model("AccountTransaction", accountTransactionSchema);
module.exports = AccountTransaction;
