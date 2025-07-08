
  const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        invoiceNumber: { type: String, required: true },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
        items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            rate: { type: Number, required: true },
            tax: { type: Number, default: 0 }
        }
        ],
        totalAmount: { type: Number, required: true },
        status: {
        type: String,
        enum: ["paid", "unpaid", "partial"],
        default: "unpaid"
        },
        issueDate: { type: Date, default: Date.now },
        dueDate: { type: Date }
    },
    { timestamps: true }
    );

    
    const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
