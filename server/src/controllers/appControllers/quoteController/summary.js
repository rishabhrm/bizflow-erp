const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Quote');

const summary = async (req, res) => {
  let defaultType = 'month';
  const { type } = req.query;

  if (type) {
    if (['week', 'month', 'year'].includes(type)) {
      defaultType = type;
    } else {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid type',
      });
    }
  }

  const currentDate = moment();
  let startDate = currentDate.clone().startOf(defaultType);
  let endDate = currentDate.clone().endOf(defaultType);

  const statuses = ['draft', 'pending', 'sent', 'accepted', 'declined'];

  const response = await Model.aggregate([
    {
      $match: {
        removed: false,
      },
    },
    {
      $facet: {
        totalQuote: [
          {
            $group: {
              _id: null,
              total: { $sum: '$total' },
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, total: '$total', count: '$count' },
          },
        ],
        statusCounts: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
          {
            $project: { _id: 0, status: '$_id', count: '$count' },
          },
        ],
      },
    },
  ]);

  let result = [];
  const totalQuotes = response[0].totalQuote.length > 0 ? response[0].totalQuote[0] : { total: 0, count: 0 };
  const statusResult = response[0].statusCounts || [];

  const statusResultMap = statusResult.map((item) => {
    return {
      ...item,
      percentage: totalQuotes.count > 0 ? Math.round((item.count / totalQuotes.count) * 100) : 0,
    };
  });

  statuses.forEach((status) => {
    const found = statusResultMap.find((item) => item.status === status);
    if (found) {
      result.push(found);
    }
  });

  const finalResult = {
    total: totalQuotes.total || 0,
    type,
    performance: result,
  };

  return res.status(200).json({
    success: true,
    result: finalResult,
    message: `Successfully found all quotes for the last ${defaultType}`,
  });
};

module.exports = summary;