# 2. System Architecture

## High-Level Overview

The DataByte website operates on a **Client-Server Architecture**. It is decoupled, meaning the Frontend (Display) and Backend (Logic/Data) are separate projects that talk to each other.

### 1. Frontend (The Interface)
*   **Technology:** React 18 + Vite
*   **Responsibility:**
    *   Rendering the UI (HTML/CSS).
    *   Handling user interactions (clicks, scrolling).
    *   Managing application state (which page is open, what data is showing).
    *    requesting data from the backend.
*   **Key Concept:** It is a **Single Page Application (SPA)**. The browser only loads one HTML file once. All subsequent page changes happen instantly via JavaScript, without refreshing the browser.

### 2. Backend (The API)
*   **Technology:** Node.js + Express
*   **Responsibility:**
    *   Serving as the "Source of Truth" for data.
    *   Security (Helmet headers, CORS policies).
    *   Performance optimization (Compression).
    *   Providing API endpoints (e.g., `GET /api/members`).
*   **Key Concept:** It is **Stateless**. It doesn't remember who "User X" is between requests. It simply answers every question (Request) with an answer (Response).

### 3. Database Layer (The Memory)
*   **Technology:** JSON Files / MongoDB
*   **Responsibility:** Storing the persistent data (Projects, Member lists, Blog content).
*   **Current State:** The system currently reads from local data files (`server/data/*.json`) or connects to a database. This separates "Code" from "Content".

### 4. Hosting Infrastructure
*   **Frontend:** Hosted on **Vercel** (optimized for static assets and React).
*   **Backend:** Hosted as **Serverless Functions** on Vercel (via `/api` rewrites) or a standalone Node server.

---

## Component Communication

1.  **User** clicks "Projects".
2.  **Frontend** (`useDataFetch` hook) wakes up.
3.  **Frontend** sends `GET https://backend.url/api/projects`.
4.  **Backend** receives request -> Router matches `/api/projects` -> Controller reads project data.
5.  **Backend** sends back `200 OK` with JSON data.
6.  **Frontend** receives JSON -> Updates React State -> Views re-render with new info.
