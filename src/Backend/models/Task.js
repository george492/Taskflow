const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
    deadline: Date,
    assignee: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    default: 'Pending'
  },
  priority: {
    type: String,
    default: 'Medium'
  },
  startDate: Date,

  TaskDone: {
    type: Number,
    default: 0
  },
  totalTasks: {
    type: Number,
    default: 0
  },
  Checklist: [{
    type: String,
    default: []
  }],
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ratingGiven: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
