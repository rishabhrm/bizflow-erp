const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  // highestEducationQualification removed
  designation: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  attendance: {
    type: Number,
    default: 0,
    min: [0, 'Attendance cannot be negative'],
    max: [31, 'Monthly attendance cannot exceed 31 days'],
  },
  status: {
    type: String,
    enum: ['active', 'former'],
    default: 'active',
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

module.exports = mongoose.model('Employee', employeeSchema);