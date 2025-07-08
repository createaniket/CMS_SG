const mongoose = require("mongoose");
  
  const salesSchema = new mongoose.Schema(
    {
        leadName: { type: String, required: true },
        contactInfo: {
            phone: { type: String, required: true },
            email: { type: String, required: true }
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Qualified", "Won", "Lost"],
            default: "New"
        },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tags: [{ type: String }],
        notes: [
            {
                authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                content: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);  

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;