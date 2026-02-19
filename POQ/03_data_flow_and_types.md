# 3. Data Flow & Types

## How Data Moves

Data in this application flows in a **Unidirectional** (One-Way) manner, a core principle of React.

### The Pipeline

1.  **Source (Server Data)**
    *   **Format:** JSON (JavaScript Object Notation).
    *   **Example:** `{ "id": 1, "title": "AI Model", "tags": ["ML", "Python"] }`
    *   *Transformation:* Files are read from disk -> Parsed into JavaScript Objects in Node.js -> Serialized back to JSON string for HTTP response.

2.  **Transport (HTTP Layer)**
    *   **Medium:** The internet (or localhost network).
    *   **Format:** Stringified JSON payload over TCP/IP.
    *   *State:* The data is "in transit".

3.  **Ingestion (Client Hook)**
    *   **Component:** `useDataFetch.js`
    *   **Action:**
        *   Receives the Response.
        *   `response.json()` parses the string back into a JavaScript Object.
        *   **Caching:** A copy is saved to `sessionStorage` (Browser Memory).

4.  **State (React Memory)**
    *   **Component:** `useState` hook.
    *   **Action:** The data sits in the component's state memory.
    *   *Trigger:* When state changes, React triggers a "Re-render".

5.  **Display (UI)**
    *   **Component:** JSX (HTML-like syntax).
    *   **Action:** The data fields (e.g., `project.title`) are injected into the HTML templates.
    *   *Result:* The user sees "AI Model" on the screen.

---

## Data Types

### 1. Projects
*   **Structure:** Array of Objects.
*   **Key Fields:**
    *   `id` (String/Number): Unique identifier.
    *   `title` (String): Display name.
    *   `description` (String): Short summary.
    *   `tags` (Array of Strings): Categories like "ML", "Web".
    *   `image` (String): URL to the thumbnail.
    *   `links` (Object): `{ github: "url", demo: "url" }`

### 2. Members
*   **Structure:** Array of Objects.
*   **Key Fields:**
    *   `name` (String)
    *   `role` (String): "President", "Core", "Member".
    *   `domain` (String): "Web Team", "Design".
    *   `socials` (Object): Links to profiles.

### 3. Async Responses
All data fetching is **Asynchronous**.
*   **Loading State:** `true` while waiting.
*   **Error State:** `null` or Error Message string if failed.
*   **Data State:** `null` initially, then specific Object/Array on success.
