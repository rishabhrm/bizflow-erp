const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const summary = require('./summary');

function modelController() {
  const Model = mongoose.model('Client');
  const methods = createCRUDController('Client');

  // CHANGE THIS LINE: Remove 'Model' from the arguments
  methods.summary = (req, res) => summary(req, res); 
  
  return methods;
}

module.exports = modelController();