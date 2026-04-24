const mongoose = require('mongoose');

const companyDocumentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  description: { type: String },
  file: { type: String, required: true }, // The middleware will automatically fill this with the local /uploads path
  accessControl: {
    type: String,
    enum: ['All Employees', 'Managers Only', 'HR Only', 'Admins Only'],
    default: 'Admins Only',
  },
  removed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CompanyDocument', companyDocumentSchema);