/**
 * Projects API Route
 * 
 * WHY THIS EXISTS:
 * Serves project data from the JSON file with server-side filtering and pagination.
 * Server-side filtering means the frontend only downloads the projects it needs,
 * not ALL projects. Critical for slow internet.
 * 
 * ENDPOINTS:
 * GET /api/projects         → All projects (paginated)
 * GET /api/projects?category=cv  → Only CV projects
 * GET /api/projects?page=2&limit=3 → Page 2, 3 items per page
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { paginate } = require('../middleware/paginate');
const { noCache } = require('../middleware/cache');

// GET /api/projects
router.get('/', noCache, (req, res) => {
    // Read data fresh on every request
    const dataPath = path.join(__dirname, '../data/projects.json');
    const projectsData = fs.readFileSync(dataPath, 'utf8');
    const projects = JSON.parse(projectsData);
    const { page = 1, limit = 6, category, status, sort } = req.query;

    let filtered = [...projects];

    // Filter by category (cv, nlp, dl, web, ml, rl)
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Filter by status (deployed, in-progress, completed, research)
    if (status && status !== 'all') {
        filtered = filtered.filter(p => p.status === status);
    }

    // Sort
    if (sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Default: keep original order (as listed in PDF)

    // Paginate
    const result = paginate(filtered, page, limit);

    res.json(result);
});

module.exports = router;
