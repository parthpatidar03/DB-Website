# 9. Basic Security & Trust Boundaries

## Who do we trust?

In security, "Trust" means "Where do we accept input without checking it?".

### 1. Trust Boundaries

*   **Public Internet:** Untrusted.
    *   Anyone can call `GET /api/projects`.
    *   *Mitigation:* **Rate Limiting** (via Vercel), **Helmet** headers (preventing framing/sniffing).
    *   *Mitigation:* The API is Read-Only. Attackers cannot "inject" bad data into our database via the API because there is no `POST /api/projects` endpoint exposed/active for them.

*   **Data Files (`server/data/*.json`):** Trusted.
    *   We assume the developer who committed this code checked the links.
    *   *Risk:* If a developer puts `<script>alert(1)</script>` into a Project Title, and the React frontend renders it using `dangerouslySetInnerHTML`, we have an **XSS (Cross-Site Scripting)** vulnerability.
    *   *Mitigation:* React escapes all content by default. `{project.title}` will render the text literal string, not execute the script.

### 2. Vulnerabilities (Low Risk)

*   **DDoS (Distributed Denial of Service):**
    *   *Risk:* Someone spams our API.
    *   *Defense:* Vercel's infrastructure handles this. We don't manage the physical server.

*   **Information Leakage:**
    *   *Risk:* Leaving `.env` files with API keys in the public GitHub repo.
    *   *Defense:* `.gitignore` must exclude `.env`.

### 3. Security Checklist (Status)
*   [x] HTTPS enabled (Automatic on Vercel).
*   [x] No sensitive user data (passwords/emails) stored.
*   [x] Dependencies scanned for vulnerabilities (`npm audit`).
*   [x] CORS configured to allow only specific domains (in production).
