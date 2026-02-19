/**
 * DataByte Backend Server — Entry Point
 * 
 * WHY THIS EXISTS:
 * This is the central file that wires everything together.
 * It creates the Express app, applies middleware in the correct order,
 * mounts route handlers, and starts listening for requests.
 * 
 * MIDDLEWARE ORDER MATTERS:
 * 1. cors() — Allow frontend (different port in dev) to call our API
 * 2. compression() — Gzip all responses (reduces payload size by ~70%)
 * 3. helmet() — Sets security headers (prevents common web attacks)
 * 4. express.json() — Parse JSON request bodies
 * 5. Routes — The actual API endpoints
 * 
 * WHAT BREAKS IF REMOVED:
 * Everything. This is the server. No server = no API = frontend shows nothing.
 */

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// Create Express app
const app = express();

// ==========================================
// MIDDLEWARE STACK
// ==========================================

// 1. CORS — Cross-Origin Resource Sharing
// In development, frontend runs on port 3000, backend on port 5000.
// Without CORS, the browser blocks requests between different ports.
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET'],
}));

// 2. COMPRESSION — Gzip all responses
// A 50KB JSON response becomes ~8KB after gzip.
// On slow internet, this means 2 seconds instead of 12 seconds.
app.use(compression());

// 3. HELMET — Security headers
// Sets headers like X-Content-Type-Options, X-Frame-Options, etc.
// Prevents clickjacking, MIME sniffing, and other common attacks.
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// 4. JSON body parser (for any future POST requests)
app.use(express.json());

// ==========================================
// API ROUTES
// ==========================================

app.use('/api/projects', require('./routes/projects'));
app.use('/api/members', require('./routes/members'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/stats', require('./routes/stats'));

// Health check endpoint (useful for monitoring)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==========================================
// START SERVER (only when not in serverless mode)
// ==========================================

// When deployed to Vercel, the app is exported as a module
// and Vercel handles the listening. We only call listen() in local dev.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`\n  🚀 DataByte API running at http://localhost:${PORT}`);
        console.log(`  📦 Routes:`);
        console.log(`     GET /api/projects`);
        console.log(`     GET /api/members`);
        console.log(`     GET /api/stats`);
        console.log(`     GET /api/health\n`);
    });
}

// Export for Vercel serverless function
module.exports = app;
