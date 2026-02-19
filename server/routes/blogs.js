/**
 * Blogs API Route
 * 
 * Serves blog data from the JSON file.
 * Blogs are static content, so we can cache them aggressively.
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { paginate } = require('../middleware/paginate');
const { noCache } = require('../middleware/cache');

// GET /api/blogs
router.get('/', noCache, (req, res) => {
    // Read data fresh on every request so updates are live
    const dataPath = path.join(__dirname, '../data/blogs.json');
    const blogsData = fs.readFileSync(dataPath, 'utf8');
    const blogs = JSON.parse(blogsData);

    const { page = 1, limit = 6, sort } = req.query;

    let filtered = [...blogs];

    // Sort by date (newest first)
    // Assuming date format is YYYY-MM-DD
    if (sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        // Default: Newest first
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Paginate
    const result = paginate(filtered, page, limit);

    res.json(result);
});

module.exports = router;
