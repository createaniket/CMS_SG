const mongoose = require("mongoose");

// Work item schema for line entries in invoice
const ItemSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Refers to Category collection
  title: { type: String, required: true },
  workDescription: { type: String },
  quantity: { type: Number, default: 1 },
  amount: { type: Number, required: true }
}, { _id: false });

// Embedded customer details (dynamic)
const CustomerInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nricLast4: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  address: { type: String },
  postalCode: { type: String }
}, { _id: false });

// Terms and Conditions block
const TermsSchema = new mongoose.Schema({
  prices: String,
  downpayments: String,
  quality: String,
  paymentTerms: String,
  warranty: String,
  confidentiality: String,
  mediation: String
}, { _id: false });

// Signature info block
const SignatureSchema = new mongoose.Schema({
  contractor: {
    name: { type: String },
    signatureUrl: { type: String }
  },
  customer: {
    name: { type: String },
    agreed: { type: Boolean, default: false },
    signatureUrl: { type: String }
  }
}, { _id: false });

// Main Invoice Schema
const InvoiceSchema = new mongoose.Schema({
  referenceNo: { type: String, required: true, unique: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  customer: CustomerInfoSchema,
  date: { type: Date, default: Date.now },
  hdbLicense: { type: String },

  items: [ItemSchema],
  subTotal: { type: Number, required: true },
  gst: { type: Number, required: true }, // e.g. 9%
  grandTotal: { type: Number, required: true },

  paymentMethods: {
    paynowKey: String,
    internetTransfer: String,
    cheque: String
  },

  terms: TermsSchema,
  signatures: SignatureSchema,
  notes: { type: String },

  status: {
    type: String,
    enum: ["draft", "sent", "confirmed", "completed", "cancelled"],
    default: "draft"
  }
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
