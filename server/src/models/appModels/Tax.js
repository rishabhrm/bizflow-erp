const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const taxSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  taxName: {
    type: String,
    trim: true,
    required: true,
  },
  taxValue: {
    type: Number,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tax', taxSchema);