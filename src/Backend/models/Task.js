const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    default: 'Pending'
  },
  priority: {
    type: String,
    default: 'Medium'
  },
  startDate: Date,
  deadline: Date,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  TaskDone: {
    type: Number,
    default: 0
  },
  totalTasks: {
    type: Number,
    default: 0
  },
  ratingGiven: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
