const mongoose = require('mongoose');
const Model = mongoose.model('Quote');
const { calculate } = require('@/helpers');
const { increaseBySettingKey } = require('@/middlewares/settings');

const create = async (req, res) => {
  let body = req.body;

  const { items = [], taxRate = 0 } = body;

  let subTotal = 0;
  let taxTotal = 0;
  let total = 0;

  // Calculate the items array with subTotal, total, taxTotal
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
  
  // Attach the current Admin ID (Required by Quote Schema)
  body['createdBy'] = req.admin._id;

  // Create new document
  const result = await new Model(body).save();
  const fileId = 'quote-' + result._id + '.pdf';
  
  const updateResult = await Model.findOneAndUpdate(
    { _id: result._id },
    { pdf: fileId },
    { new: true }
  ).exec();

  // Increase the Quote Number setting
  increaseBySettingKey({
    settingKey: 'last_quote_number',
  });

  return res.status(200).json({
    success: true,
    result: updateResult,
    message: 'Quote created successfully',
  });
};

module.exports = create;