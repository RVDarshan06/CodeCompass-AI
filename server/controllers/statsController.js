const User = require("../models/User");
const Resume = require("../models/Resume");

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users: totalUsers,
        resumes: totalResumes,
        tools: 6,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

module.exports = { getStats };