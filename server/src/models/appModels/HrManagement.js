const mongoose = require('mongoose');

const hrManagementSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    required: true,
    autopopulate: true, // Automatically fetches the linked employee's details
  },
  onboarding: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  offboarding: {
    type: String,
    enum: ['N/A', 'Pending', 'Completed'],
    default: 'N/A',
  },
  employeeDataFetch: {
    type: Boolean,
    default: false,
  },
  noticeIssue: {
    type: String,
    default: 'None',
  },
  removed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// If your ERP uses the mongoose-autopopulate plugin, include this:
hrManagementSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('HrManagement', hrManagementSchema);