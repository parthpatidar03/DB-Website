# 1. Application Flow

## The User Journey (End-to-End)

This document explains how a user interacts with the DataByte website, step-by-step, in plain English.

### Step 1: Landing on the Homepage (The "Input Layer")
1.  **Entry:** The user visits `databyte.nit.edu` (or localhost).
2.  **Initial Load:** The browser downloads the `index.html`, which immediately loads the React JavaScript bundle.
3.  **Visuals:** The user sees a "Neural Splash" hero section with a scatter plot effect.
    *   **Action:** The "DataByte" text acts as a hook.
    *   **Animations:** Elements float and interact (Database, Brain icons), powered by `framer-motion`.
4.  **Navigation:** The user can click "run_exploration.py" (a stylized button) to go to Projects, or use the Navbar.

### Step 2: Exploring Projects ("Model Zoo")
1.  **Navigation:** User clicks "Projects" in the navbar.
2.  **Data Fetching:**
    *   The page checks if project data is already in the *Session Cache*.
    *   **If Cached:** Shows the list immediately.
    *   **If New:** A "Loading Skeleton" appears briefly while the browser requests `/api/projects` from the server.
3.  **Interaction:** The user sees a grid of project cards (e.g., "Defects Detection", "Recruitments 2024").
4.  **Filtering:** The user can click tags like "Computer Vision" or "Web Dev" to filter the list instantly (client-side filtering).

### Step 3: Meeting the Team ("Neural Network")
1.  **Navigation:** User clicks "Members".
2.  **Visuals:** A list of team members appears, categorized by role (Heads, Core, etc.).
3.  **Details:** Each member card shows their photo, name, and social links (GitHub, LinkedIn).
    *   *Note:* Images are lazy-loaded to keep the page fast.

### Step 4: Reading Blogs
1.  **Action:** User visits the "Blogs" section to read about recent events or technical articles.
2.  **Content:** The frontend fetches blog metadata from `/api/blogs`.

### Step 5: "Terminal" Interaction (Hidden Feature)
1.  **Action:** The user presses `Ctrl + K`.
2.  **Result:** A command palette (resembling a terminal) opens overlaying the screen.
3.  **Usage:** The user can type commands like `> goto projects` or `> theme light` to interact with the site using keyboard shortcuts, reinforcing the "hacker/developer" aesthetic.

### Step 6: Background System
*   While the user navigates, the **Background Grid** remains fixed, giving a cohesive feel.
*   **Vite** (in dev) or **Vercel** (in prod) serves the assets.
*   **Express Server** acts as the brain, responding to every `/api` request with JSON data.
