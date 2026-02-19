# Caching & Pagination Implementation

## 1. Pagination

### **What is it?**
Pagination is the process of dividing a large dataset into smaller, manageable chunks (pages). Instead of sending 1000 items to the frontend at once, we send them 10 at a time (Page 1, Page 2, etc.).

### **Why we use it?**
1.  **Performance**: Sending 50MB of data breaks mobile browsers and consumes user data. Pagination sends ~20KB per request.
2.  **Speed**: Database queries are faster when they only need to fetch 10 items (`LIMIT 10`) rather than scanning millions.
3.  **UX**: Users can't process 1000 items at once. Infinite scroll or "Next Page" buttons are standard patterns.

### **How it works in this project**
We use a custom helper function: `server/middleware/paginate.js`.

**The Code:**
```javascript
const paginate = (items, page = 1, limit = 6) => {
    // 1. Calculate start and end indices
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // 2. Slice the array (like cutting a loaf of bread)
    const slicedData = items.slice(startIndex, endIndex);

    // 3. Return data + metadata for the frontend
    return {
        data: slicedData,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(items.length / limit),
            hasMore: endIndex < items.length
        }
    };
};
```

**Usage in API (`routes/blogs.js`):**
```javascript
// GET /api/blogs?page=2&limit=5
const { page, limit } = req.query; 
const result = paginate(allBlogs, page, limit);
res.json(result);
```

---

## 2. Caching

### **What is it?**
Caching is storing a copy of data in a fast-access location (like RAM or a CDN) so you don't have to rebuild it or reading it from the slow hard drive/database every time.

### **Current Implementation**
**We deliberately DO NOT cache the API responses currently.** 

In `server/routes/blogs.js`, you will see:
```javascript
router.get('/', noCache, (req, res) => { ... })
```

### **Why no cache? (The "Why")**
This project currently uses **JSON files** as a database.
1.  **Live Updates**: If we cached the data in memory (RAM), editing `blogs.json` manually would not update the website until we restarted the server.
2.  **Simplicity**: Reading a file on every request is "fast enough" for current traffic levels (<100 req/sec) and allows us to focus on building features rather than cache invalidation bugs.

### **How we WOULD do it (The "Senior Engineer" View)**
If this were a high-scale production app, we would:

1.  **Memory Cache (Redis/Node-Cache)**:
    Store the parsed JSON in memory. Check if the file changed (`fs.stat`) before re-reading.
    *Benefit*: 0ms latency vs 5ms latency.
    *Cost*: Complexity of implementation.

2.  **HTTP Caching (CDN)**:
    Use headers like `Cache-Control: public, max-age=3600`.
    This tells the browser (and Vercel CDN): "Don't ask the server again for 1 hour. Use the copy you have."
    *Our `middleware/cache.js` has helpers for this (`shortCache`, `longCache`), but we intentionally use `noCache` for now.*

## Summary for Interviews
-   **Pagination**: standard `offset/limit` strategy implemented via Array slicing (since we use local JSON data).
-   **Caching**: Intentionally disabled (`no-store`) to prioritize development speed and instant updates from file edits. Scalable solutions (Redis/CDN) are ready to be enabled via existing middleware when needed.
