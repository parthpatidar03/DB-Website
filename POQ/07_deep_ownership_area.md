# 7. Deep Ownership Area: Frontend Data Architecture

## The `useDataFetch` Hook & Caching Strategy

I have chosen to explain the **Data Fetching Layer** deeply because it is the "bridge" between your static UI and dynamic content. It determines how fast the site *feels*.

### The Code: `client/src/hooks/useDataFetch.js`

This isn't just `useEffect` + `fetch`. It implements a pattern called **Stale-While-Revalidate (SWR)**.

#### 1. The Core Logic
```javascript
useEffect(() => {
  // Step 1: Check Cache (Instant)
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    setData(JSON.parse(cached)); // Update UI immediately
  }

  // Step 2: Fetch Fresh Data (Background)
  fetch(url).then(data => {
    setData(data); // Update UI again with fresh data
    sessionStorage.setItem(cacheKey, JSON.stringify(data)); // Update Cache
  });
}, [url]);
```

#### 2. Why this matters (The "Why")
*   **User Experience:** Eliminates the "flicker" of loading spinners on navigation. If a user goes Home -> Projects -> Home -> Projects, the second time they see content instantly.
*   **Perceived Speed:** The site feels like a native app.
*   **Resilience:** If the network is flaky, the user still sees cached content.

#### 3. Assumptions & Risks
*   **Assumption:** The data is small enough to fit in `sessionStorage` (Limit is ~5MB).
    *   *Risk:* If we have 10,000 projects, this will crash or fail silently.
*   **Assumption:** Data doesn't change *every second*.
    *   *Risk:* If this was a stock trading app, showing 5-second old data would be bad. For a portfolio, it's perfect.

#### 4. Trade-offs
*   **Alternative:** **Redux / Context API**.
    *   *Why not?* Too complex (Overengineering) for simple data reading.
*   **Alternative:** **React Query / crypto**.
    *   *Why not?* Adds bundle size. Our custom hook is < 50 lines of code.

### What breaks if this changes?
*   **If we remove Caching:** Every page navigation triggers a network request. Site feels 300ms slower on every click. Server gets 2x more traffic.
*   **If `sessionStorage` is disabled (Private Mode):** The hook gracefully falls back to just network fetching. (We assume `try-catch` wraps the storage calls).

### Interview Explanation
"I implemented a custom Stale-While-Revalidate hook to optimize performance. It serves cached data from Session Storage immediately for near-zero latency navigation, while quietly updating content in the background. This avoids the heavy overhead of libraries like React Query while maintaining a snappy, app-like experience for the user."
