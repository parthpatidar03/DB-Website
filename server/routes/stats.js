const express = require('express');
const router = express.Router();
const { noCache } = require('../middleware/cache');

// Load data sources
const projects = require('../data/projects.json');
const members = require('../data/members.json');
// We still keep stats.json for fallback/static data like events
const staticStats = require('../data/stats.json');

// GET /api/stats
router.get('/', noCache, (req, res) => {
    try {
        // 1. Calculate Project Stats
        const projectStats = {
            total: projects.length,
            categories: projects.reduce((acc, curr) => {
                const cat = curr.category || 'other';
                acc[cat] = (acc[cat] || 0) + 1;
                return acc;
            }, {})
        };

        // 2. Calculate Member Stats
        const memberStats = {
            total: '40+',
            batches: members.reduce((acc, curr) => {
                const batch = curr.batch || 'unknown';
                acc[batch] = (acc[batch] || 0) + 1;
                return acc;
            }, {})
        };

        // 3. Merge with static stats (events, achievements)
        const responseData = {
            ...staticStats,
            projects: projectStats,
            members: memberStats,
            achievements: {
                ...staticStats.achievements,
                projects_deployed: projects.length // Sync this with actual projects
            }
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error generating stats:', error);
        // Fallback to static stats if calculation fails
        res.json(staticStats);
    }
});

module.exports = router;
