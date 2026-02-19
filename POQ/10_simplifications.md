# 10. Simplifications & Out-of-Scope Areas

## What did we skip? (And why it's okay)

Software engineering is about trade-offs. We intentionally simplified these areas to focus on what matters: **Learning & Shipping**.

### 1. The Database
*   **Complexity:** Real DB (MongoDB/PostgreSQL) with ORM, Connection Pooling, Migrations.
*   **Simplification:** JSON files in `server/data`.
*   **Why?**
    *   Zero setup time.
    *   Free hosting (no DB cluster costs).
    *   Data is small (< 1MB) and rarely changes.
    *   Git provides "version control" for our data automatically.

### 2. Admin Generic Dashboard
*   **Complexity:** A secure login system + forms to Add/Edit Projects.
*   **Simplification:** Content managed via Code (VS Code is the "CMS").
*   **Why?**
    *   Building authentication is hard and risky.
    *   For a club website, only 2-3 technical people need to update content. They know how to edit JSON.

### 3. Server Management
*   **Complexity:** Docker containers, Nginx config, Linux VPS.
*   **Simplification:** PaaS (Platform as a Service) - Vercel.
*   **Why?**
    *   We focus on Code, not Infrastructure.
    *   CI/CD is automated (Push to Git -> Live Site).

### 4. Testing
*   **Complexity:** 100% Jest Unit Tests + Cypress End-to-End Tests.
*   **Simplification:** Manual testing ("Click around and see if it works").
*   **Why?**
    *   The project is visual/presentational.
    *   Rapid iteration speed was prioritized over test coverage for the MVP.

## Future Improvements (The "Roadmap")

If this project grew 10x, we would need:
1.  **MongoDB Atlas:** To handle 10k+ members.
2.  **Next.js:** For better SEO (Server-Side Rendering) than standard React.
3.  **Auth0 / Clerk:** For member login.
