const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { _id: true }
);

const attachmentSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    type: String,
    size: Number
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed', 'archived'],
      default: 'todo'
    },
    dueDate: Date,
    completedAt: Date,
    reminderAt: Date,
    labels: [{ type: String }],
    subtasks: [subtaskSchema],
    attachments: [attachmentSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    categorySlug: {
      type: String,
      default: 'personal'
    },
    aiCategory: {
      type: String,
      default: ''
    },
    position: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
