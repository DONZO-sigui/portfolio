const StatisticsModel = require('../models/statistics.model');

const getStatistics = async (req, res) => {
    try {
        const stats = await StatisticsModel.getStatistics();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateStatistics = async (req, res) => {
    const { platform, followers, engagement_rate, monthly_views } = req.body;
    try {
        const updatedStats = await StatisticsModel.updateStatistics(platform, followers, engagement_rate, monthly_views);
        res.status(200).json(updatedStats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStatistics, updateStatistics };
