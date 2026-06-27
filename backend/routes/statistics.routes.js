const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/statistics.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', StatisticsController.getStatistics);
router.put('/', authMiddleware, StatisticsController.updateStatistics); // Protected route

module.exports = router;
