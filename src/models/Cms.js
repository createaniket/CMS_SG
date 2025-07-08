const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    }
  },
  { timestamps: true }
);
const Cms = mongoose.model('Cms', cmsSchema);

module.exports = Cms;