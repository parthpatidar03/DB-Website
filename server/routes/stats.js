/**
 * Stats API Route
 * 
 * WHY THIS EXISTS:
 * Serves club statistics for the homepage. This is a tiny payload (~200 bytes)
 * that rarely changes, so it's cached aggressively (1 hour browser, 1 day CDN).
 * 
 * ENDPOINTS:
 * GET /api/stats → Returns club statistics object
 */

const express = require('express');
const router = express.Router();
const { longCache } = require('../middleware/cache');

// Load stats data
const stats = require('../data/stats.json');

// GET /api/stats
router.get('/', longCache, (req, res) => {
    res.json(stats);
});

module.exports = router;
