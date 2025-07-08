  const mongoose = require("mongoose");

const emailMarketingSchema = new mongoose.Schema(
    {
        campaignName: { type: String, required: true },
        subject: { type: String, required: true },
        htmlContent: { type: String, required: true },
        contactList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
        status: {
        type: String,
        enum: ["draft", "sent", "scheduled"],
        default: "draft"
        },
        scheduledTime: { type: Date },
        statistics: {
        sent: { type: Number, default: 0 },
        opened: { type: Number, default: 0 },
        clicked: { type: Number, default: 0 },
        bounced: { type: Number, default: 0 }
        }
    },
    { timestamps: true }
    );  

const EmailMarketing = mongoose.model("EmailMarketing", emailMarketingSchema);
module.exports = EmailMarketing;