const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const summary = require('./summary');
const create = require('./create');
const update = require('./update');

function modelController() {
  const methods = createCRUDController('Quote');
  
  // Connect the custom methods
  methods.summary = (req, res) => summary(req, res);
  methods.create = (req, res) => create(req, res);
  methods.update = (req, res) => update(req, res);
  
  return methods;
}

module.exports = modelController();