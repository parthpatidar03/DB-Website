# 11. Interview Preparation: The 12 "No-Thinking" Questions

## Automatic Answers for Rapid Fire

**1. Why was this database chosen?**
*   **Answer:** We used JSON files because valid data was small (<1MB) and static.
*   **Alternative:** MongoDB.
*   **Trade-off:** We gained zero-setup speed but lost the ability to query complex relationships efficiently.

**2. Why is the file/folder structure split this way?**
*   **Answer:** We separated `client` and `server` to mimic a real microservices architecture.
*   **Merge:** We could have used Next.js API routes (merged folders), but we wanted to learn distinct backend logic with Express.

**3. Why is this framework used?**
*   **Answer:** React + Vite.
*   **Problem Solved:** Component reusability and instant feedback during development (Hot Module Replacement).
*   **Simpler:** HTML + jQuery would work but would become unmanageable with 5+ pages.

**4. If this project were rebuilt today:**
*   **Simplification:** I would use Next.js to handle both frontend and API in one framework, removing the need for `cors` and two `package.json` files.

**5. Which abstractions are necessary vs organizational?**
*   **Necessary:** `useDataFetch` hook (abstracts complex caching logic).
*   **Organizational:** Separation of `routes` and `controllers` in the backend (could be one file, but split for readability).

**6. Which data model is most sensitive to change?**
*   **Answer:** `Projects` schema.
*   **Why:** The frontend Card component relies heavily on `tags`, `image`, and `title` existing. If we change `image` to `images[]`, the UI breaks.

**7. Which errors are intentionally handled?**
*   **Handled:** Network/Fetch errors (`try-catch` in hook).
*   **Allowed to crash:** Critical logic errors (like a typo in a constant). We let React Error Boundary catch it because we can't recover from bad code at runtime.

**8. Where would performance degrade first if usage increased 10x?**
*   **Answer:** The Client-Side Search/Filter.
*   **Why:** We are filtering arrays in the browser. If we had 10,000 projects, the UI would freeze on every keystroke. We'd need to move search to the Backend (MongoDB Atlas Search).

**9. Where does the system trust user input?**
*   **Answer:** Only in the URL (Route parameters like `/projects/:id` - if we had details page).
*   **Control:** We validate that `id` is a number/valid string before querying.

**10. If only three things were tested, what should they be?**
*   1. The `useDataFetch` hook (Data Layer).
*   2. The `ProjectCard` rendering (Visual Layer).
*   3. The API endpoint `/api/projects` response format (Contract Layer).

**11. Which part of this project is hardest for a new developer to understand?**
*   **Answer:** The Custom Caching Hook (`client/src/hooks/useDataFetch.js`). It handles side-effects, session storage, and race conditions all in one.

**12. Design Choice -> Interview Explanation**
*   *Stale-While-Revalidate:* "I chose to serve stale data instantly while updating in the background to make the app feel native-fast, rather than making the user wait for a loading spinner on every click."
