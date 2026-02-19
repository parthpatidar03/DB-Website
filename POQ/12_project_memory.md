# 12. Project Memory File

## The "Cheat Sheet" for your Brain

Read this 5 minutes before your interview.

### 1. The 5-Sentence Summary
"DataByte Website is a full-stack portfolio platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a disconnected client-server architecture where a React frontend consumes data from a RESTful Express API. Key technical highlights include a custom Stale-While-Revalidate caching hook for sub-100ms navigation and a component-based UI system using Tailwind CSS. I prioritized modularity and reading speed, handling data storage via lightweight JSON files for this version. The project demonstrates my ability to build scalable, decoupled systems with a focus on User Experience."

### 2. Spoken Application Flow
"The user lands on the Home page, greeted by a 'Neural Splash' interactive hero section. They navigate to the Projects page, where data is fetched from our Express backend—cached locally for instant subsequent loads. They can filter these projects by domain (ML/Web) entirely client-side. Finally, they can explore the Team section or use the hidden 'Terminal' feature (Ctrl+K) to navigate via keyboard commands."

### 3. Key Decisions & Trade-offs
*   **Decision:** Separating Frontend and Backend fully.
    *   *Trade-off:* More complex setup (CORS, 2 servers) vs. Tighter coupling (Next.js).
    *   *Why:* To demonstrate understanding of pure REST API patterns.
*   **Decision:** JSON Files over Database.
    *   *Trade-off:* Fast setup vs. Poor query scalability.
    *   *Why:* Data volume is low; overhead of a real DB wasn't justified yet.

### 4. Non-Obvious Syntax
*   `useDataFetch` Hook: `const isMounted = useRef(true);`
    *   *Explanation:* "I use a Ref to track if the component is still on screen before trying to update State. This prevents memory leak errors if the user navigates away while a fetch is pending."

### 5. Depth vs. Breadth
*   **I know DEEPLY:** How React Hooks (`useEffect`, `useCallback`) manage the lifecycle of async data.
*   **I know at High Level:** How Vercel manages the Serverless Function cold-start times.
