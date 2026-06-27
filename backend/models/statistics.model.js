const pool = require('../config/db');

const getStatistics = async () => {
    const { rows } = await pool.query('SELECT * FROM statistics ORDER BY id ASC');
    return rows;
};

const updateStatistics = async (platform, followers, engagementRate, monthlyViews) => {
    const { rows } = await pool.query(
        'UPDATE statistics SET followers = $1, engagement_rate = $2, monthly_views = $3, updated_at = CURRENT_TIMESTAMP WHERE platform = $4 RETURNING *',
        [followers, engagementRate, monthlyViews, platform]
    );
    return rows[0];
};

module.exports = { getStatistics, updateStatistics };
