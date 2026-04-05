const { getDashboardSummaryService } = require("../services/dashboard.serivce");
const getDashBoardSummary = async (req, res) => {
  try {
    const user = req.user;
    const data = await getDashboardSummaryService(user);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDashBoardSummary };
