const mongoose = require('mongoose');

const aiSummarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    summaryDate: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    productivityScore: {
      type: Number,
      default: 0
    },
    insights: [{ type: String }],
    suggestions: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('AISummary', aiSummarySchema);
