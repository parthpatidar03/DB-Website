/**
 * Vercel Serverless Function Wrapper
 * 
 * WHY THIS EXISTS:
 * Vercel doesn't run a traditional Node server. Instead, it wraps your Express app
 * into a "serverless function" that spins up on demand when a request hits /api/*.
 * This file is the bridge between Vercel's serverless infrastructure and our Express app.
 * 
 * HOW IT WORKS:
 * 1. Vercel routes any request matching /api/* to this file
 * 2. This file imports our Express app
 * 3. Vercel passes the request to Express
 * 4. Express handles routing, middleware, and sends the response
 * 
 * WHAT BREAKS IF REMOVED:
 * The API won't work on Vercel. You'd get 404 for all /api/* requests.
 * Locally (npm run dev), this file is never used — the server listens directly.
 */

const app = require('../server/index');

module.exports = app;
