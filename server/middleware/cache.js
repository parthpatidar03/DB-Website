/**
 * Cache Middleware
 * 
 * WHY THIS EXISTS:
 * When deployed on Vercel, responses pass through their Edge Network (CDN).
 * By setting Cache-Control headers, we tell Vercel's CDN to cache responses
 * so repeat requests don't even hit our server — they're served from the
 * nearest CDN edge node. This is crucial for slow internet scenarios.
 * 
 * WHAT BREAKS IF REMOVED:
 * Every request would hit the serverless function, adding ~200-500ms latency.
 * With caching, repeat requests are served in ~10-50ms from CDN.
 * 
 * HOW IT WORKS:
 * - max-age: How long the BROWSER caches (private to user)
 * - s-maxage: How long the CDN caches (shared across all users)
 * - stale-while-revalidate: Serve stale data while fetching fresh in background
 */

/**
 * Creates cache middleware with configurable durations
 * @param {number} browserSeconds - Browser cache duration (max-age)
 * @param {number} cdnSeconds - CDN cache duration (s-maxage)
 */
const cacheControl = (browserSeconds = 300, cdnSeconds = 600) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method === 'GET') {
      res.set(
        'Cache-Control',
        `public, max-age=${browserSeconds}, s-maxage=${cdnSeconds}, stale-while-revalidate=${cdnSeconds * 2}`
      );
    }
    next();
  };
};

// Pre-configured cache levels
const shortCache = cacheControl(60, 300);       // 1 min browser, 5 min CDN
const mediumCache = cacheControl(300, 600);     // 5 min browser, 10 min CDN
const longCache = cacheControl(3600, 86400);    // 1 hour browser, 1 day CDN
const noCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
};

module.exports = { cacheControl, shortCache, mediumCache, longCache, noCache };
