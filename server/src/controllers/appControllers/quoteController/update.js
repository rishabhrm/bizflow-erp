const mongoose = require('mongoose');
const Model = mongoose.model('Quote');
const { calculate } = require('@/helpers');

const update = async (req, res) => {
  let body = req.body;
  const { items = [], taxRate = 0 } = body;

  let subTotal = 0;
  let taxTotal = 0;
  let total = 0;

  // Recalculate totals
  items.map((item) => {
    let itemTotal = calculate.multiply(item['quantity'], item['price']);
    subTotal = calculate.add(subTotal, itemTotal);
    item['total'] = itemTotal;
  });
  
  taxTotal = calculate.multiply(subTotal, taxRate / 100);
  total = calculate.add(subTotal, taxTotal);

  body['subTotal'] = subTotal;
  body['taxTotal'] = taxTotal;
  body['total'] = total;
  body['items'] = items;
  body['pdf'] = 'quote-' + req.params.id + '.pdf';

  const result = await Model.findOneAndUpdate({ _id: req.params.id }, body, {
    new: true,
    runValidators: true,
  }).exec();

  return res.status(200).json({
    success: true,
    result,
    message: 'Quote updated successfully',
  });
};

module.exports = update;