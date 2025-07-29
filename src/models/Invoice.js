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

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: { type: String, unique: true, required: true }, // Unique invoice number
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }, // Reference to Company
        items: [itemSchema], // Array of invoice items
        subtotal: { type: Number, required: true }, // Subtotal amount
        totalTax: { type: Number, default: 0 }, // Total tax amount
        totalAmount: { type: Number, required: true }, // Total amount after tax and discounts
        issueDate: { type: Date, default: Date.now }, // Invoice issue date
        dueDate: { type: Date, required: true }, // Due date for payment
        status: {
            type: String,
            enum: ["paid", "unpaid", "partial", "overdue"],
            default: "unpaid",
        }, // Invoice status
        notes: { type: String }, // Additional notes or comments
    },
    { timestamps: true }
);
const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;