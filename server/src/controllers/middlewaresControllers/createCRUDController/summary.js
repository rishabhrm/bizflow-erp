const summary = async (Model, req, res) => {
  try {
    let countFilter = 0;
    
    // Only run the filter query if the parameters actually exist
    if (req.query.filter && req.query.equal) {
      countFilter = await Model.countDocuments({ removed: false })
        .where(req.query.filter)
        .equals(req.query.equal)
        .exec();
    }

    // Get the total count of documents
    const countAllDocs = await Model.countDocuments({ removed: false }).exec();

    return res.status(200).json({
      success: true,
      result: countAllDocs, // Pass the clean number back to the frontend
      message: 'Successfully counted all documents',
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