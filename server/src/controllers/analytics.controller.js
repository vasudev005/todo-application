const { getAnalyticsOverview } = require('../services/analytics.service');

const getOverview = async (req, res) => {
  const analytics = await getAnalyticsOverview(req.user._id);
  res.json({ analytics });
};

module.exports = { getOverview };
