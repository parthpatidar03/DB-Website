# 5. External Dependencies

## Third-Party Libraries

We avoid "reinventing the wheel" by using battle-tested libraries for standard problems.

### Frontend

| Dependency | Purpose | Failure Mode |
| :--- | :--- | :--- |
| **React** | Core UI library. | App fails to load (White Screen of Death). |
| **Vite** | Build tool & Dev server. | Build fails; Development environment won't start. |
| **Tailwind CSS** | Styling utility. | CSS classes don't apply; site looks unstyled. |
| **Framer Motion** | Complex animations. | Animations jitter or elements don't appear (if stuck at `opacity: 0`). |
| **React Router** | Navigation. | Links don't work; URL changes but page doesn't. |
| **Lucide React** | Icons (Lightweight SVG). | Icons appear as blank spaces. |

### Backend

| Dependency | Purpose | Failure Mode |
| :--- | :--- | :--- |
| **Express** | Web Server framework. | API endpoints return 404 or connection refused. |
| **Cors** | Cross-Origin security. | Frontend cannot talk to Backend (Browser blocks it). |
| **Helmet** | Security headers. | Site works, but is vulnerable to attacks. |
| **Compression** | Gzip response. | Site works, but is slower. |

### Services

| Service | Purpose | Risk |
| :--- | :--- | :--- |
| **Vercel** | Hosting & Deployment. | Site goes offline; Deployment fails. |
| **GitHub** | Source Control. | Cannot push/pull code. |

---

## Inputs & Outputs

*   **Inputs:** User interactions (Clicks, Scroll), API Requests.
*   **Outputs:** DOM Updates (Visual changes), JSON Responses.
