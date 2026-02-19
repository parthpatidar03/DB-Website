/**
 * Members API Route
 * 
 * WHY THIS EXISTS:
 * Serves member data from the JSON file with filtering by batch year and domain.
 * Member images are resolved from the rollNo — the image path is constructed
 * as `/images/members/{rollNo}.png` on the frontend.
 * 
 * ENDPOINTS:
 * GET /api/members              → All members (paginated)
 * GET /api/members?batch=2028   → Only 2028 batch members
 * GET /api/members?domain=CV    → Only CV domain members
 * GET /api/members?batch=2028&domain=NLP → Combined filters
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { paginate } = require('../middleware/paginate');
const { noCache } = require('../middleware/cache');

// GET /api/members
router.get('/', noCache, (req, res) => {
    // Read data fresh on every request
    const dataPath = path.join(__dirname, '../data/members.json');
    const membersData = fs.readFileSync(dataPath, 'utf8');
    const members = JSON.parse(membersData);
    const { page = 1, limit = 9, batch, domain } = req.query;

    let filtered = [...members];

    // Filter by batch year (2026, 2027, 2028)
    if (batch && batch !== 'all') {
        filtered = filtered.filter(m => m.batch === batch);
    }

    // Domain Alias Mapping
    // Maps frontend IDs (web, cv, etc.) to possible values in the JSON data
    const DOMAIN_ALIASES = {
        'cv': ['computer vision', 'cv'],
        'nlp': ['nlp', 'natural language processing'],
        'web': ['web development', 'web dev', 'web'],
        'design': ['design', 'ui/ux', 'creative'],
        'ml': ['machine learning', 'ml'],
        'dl': ['deep learning', 'dl'],
        'rl': ['reinforcement learning', 'rl']
    };

    // Filter by domain
    if (domain && domain !== 'all') {
        const searchDomain = domain.toLowerCase();
        // Get valid aliases for this domain, or just use the search term itself if not found
        const validAliases = DOMAIN_ALIASES[searchDomain] || [searchDomain];

        filtered = filtered.filter(m => {
            const memberDomain = (m.domain || '').toLowerCase();
            return validAliases.some(alias => memberDomain.includes(alias) || memberDomain === alias);
        });
    }

    // Paginate
    const result = paginate(filtered, page, limit);

    res.json(result);
});

module.exports = router;
