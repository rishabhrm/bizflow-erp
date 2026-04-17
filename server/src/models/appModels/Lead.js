const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'company',
    enum: ['company', 'people'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
    required: true,
  },
  source: {
    type: String,
  },
  notes: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lead', leadSchema);