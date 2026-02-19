# 8. Assumptions & Constraints

## What we assume to be true

The system relies on these facts. If they change, the system might break or behave unexpectedly.

### 1. Data Integrity Assumptions
*   **Assumption:** The JSON files in `server/data` are always valid JSON.
    *   *Impact:* Build/Run failure if a comma is missing.
*   **Assumption:** Every Project has a unique `id`.
    *   *Impact:* React Lists keys might conflict, causing rendering bugs.
*   **Assumption:** Image URLs are valid and accessible publicly.
    *   *Impact:* Broken images on the UI.

### 2. Environmental Assumptions
*   **Assumption:** The `PORT` environment variable is set in production, or defaults to 5000 locally.
    *   *Impact:* App might fail to bind to the correct port on Vercel if this is mishandled.
*   **Assumption:** The user has a modern browser (Chrome, Firefox, Edge, Safari > 12).
    *   *Impact:* We use ES6+ features (Promises, Arrow Functions, CSS Variables). IE11 will see a blank screen.

### 3. Usage Constraints
*   **Constraint:** This is a **Read-Only** system for public users.
    *   *Impact:* No user registration, no "Add Project" button on the frontend.
*   **Constraint:** Data updates require code commits (currently).
    *   *Impact:* To add a member, a developer must edit `members.json` and push to GitHub.

### 4. Technical Constraints
*   **Constraint:** `sessionStorage` is per-tab.
    *   *Impact:* Opening the site in a new tab re-fetches data.
*   **Constraint:** Vercel Serverless Functions have a timeout (usually 10s).
    *   *Impact:* Long-running tasks (like video processing) cannot happen in the API response loop.
