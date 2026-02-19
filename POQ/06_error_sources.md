# 6. Error Sources (Not Fixes)

## Where Problems Usually Start

This document identifies the most likely places for errors to occur, categorized by where they happen.

### 1. Frontend (The Client) - "The Display Layer"

*   **Network Failure:**
    *   *Symptom:* Infinite loading spinner or "Failed to fetch" message.
    *   *Cause:* User is offline, or the API server is down.
    *   *Handling:* The `useDataFetch` hook catches this exception and sets an error state.

*   **Data Structure Mismatch:**
    *   *Symptom:* "Cannot read property 'map' of undefined" (White Screen).
    *   *Cause:* The API returns `{ "projects": [] }` but the frontend expects `[Array]`.
    *   *Handling:* React's Error Boundaries (if implemented) or defensive coding (`data?.map()`).

*   **Browser Compatibility:**
    *   *Symptom:* Layout looks broken on old Safari/iOS.
    *   *Cause:* Using modern CSS (like `gap` in flexbox) or JavaScript features without polyfills.

### 2. Backend (The Server) - "The Logic Layer"

*   **File Read Error:**
    *   *Symptom:* API returns 500 Internal Server Error.
    *   *Cause:* The JSON data file is missing, corrupt, or has invalid syntax (e.g., a missing comma in `projects.json`).
    *   *Handling:* `try-catch` blocks in the Controller read logic.

*   **Rate Limiting:**
    *   *Symptom:* API returns 429 Too Many Requests.
    *   *Cause:* A user (or bot) is hitting the API too fast.
    *   *Ref:* Vercel has built-in limits for Serverless Functions.

*   **CORS Policy:**
    *   *Symptom:* Browser console shows "Blocked by CORS policy".
    *   *Cause:* The frontend URL is not in the allowed list on the backend. This often happens when deploying to a new domain without updating the server config.

### 3. External Services

*   **Image Hosting (e.g., Google Drive/Imgur):**
    *   *Symptom:* Broken image icon.
    *   *Cause:* The link became invalid, or the host is down, or hotlinking is forbidden.
    *   *Handling:* Standard `onError` event in `<img>` tag to show a fallback placeholder.

---

## The "Silent" Errors

These don't crash the app but degrade experience:
1.  **Stale Cache:** User sees old data because their browser cache hasn't expired yet.
2.  **Slow Animations:** Low FPS on older mobile devices because of complex particle effects.
