const mongoose = require('mongoose');

const summary = async (req, res) => {
  const Payment = mongoose.model('Payment');
  const Expense = mongoose.model('Expense');

  try {
    const incomeResult = await Payment.aggregate([
      { $match: { removed: false } },
      { $group: { _id: null, totalIncome: { $sum: '$amount' } } },
    ]);

    const expenseResult = await Expense.aggregate([
      { $match: { removed: false } },
      { $group: { _id: null, totalExpense: { $sum: '$amount' } } },
    ]);

    const totalIncome = incomeResult.length > 0 ? incomeResult[0].totalIncome : 0;
    const totalExpense = expenseResult.length > 0 ? expenseResult[0].totalExpense : 0;
    const profit = totalIncome - totalExpense;

    return res.status(200).json({
      success: true,
      result: { totalIncome, totalExpense, profit },
      message: 'Successfully generated report summary',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = summary;