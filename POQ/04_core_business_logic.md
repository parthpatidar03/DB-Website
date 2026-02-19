# 4. Core Business Logic

## Decision-Making Logic

Unlike a complex SaaS app, a Portfolio/Club website's "business logic" is primarily about **Presentation** and **Categorization**.

### Key Logic Areas

1.  **Data Categorization (Filtering)**
    *   **Logic:** The system must be able to group Projects and Members dynamically.
    *   **Implementation:** Client-side filtering. We fetch *all* projects once, then use JavaScript `array.filter()` to show only "Computer Vision" projects when the user clicks a button.
    *   *Why:* Better UX. No server round-trip needed to switch categories.

2.  **Stale-While-Revalidate Caching**
    *   **Logic:** "Always show something, even if it might be old, then fix it."
    *   **Decision:** We prioritize *Perceived Performance* over *Absolute Consistency*. It's better to show a list of projects from 5 minutes ago instantly than to make the user wait 1 second for the absolute latest list.

3.  **Lazy Loading Images**
    *   **Logic:** Don't download images the user can't see yet.
    *   **Implementation:** Browser-native `loading="lazy"` or Intersection Observer.
    *   *Why:* Saves bandwidth and speeds up initial page load, especially on mobile.

### Unique Aspects

*   **"The Terminal" (`Ctrl+K`):**
    *   This is a custom feature not found in standard websites.
    *   **Logic:** It listens for global keydown events. It parses text commands using basic string matching (Regex or `startsWith`).
    *   *Purpose:* Gamification. It appeals to the target audience (Developers/Students).

### Edge Cases

*   **API Failure:** If the backend is down, the `useDataFetch` hook catches the error and sets an `error` state. The UI displays a "Failed to load" message instead of crashing white.
*   **Empty Data:** If a category has no projects, the list renders an "Empty State" message instead of a blank space.
*   **Slow Network:** The SWR strategy masks slow networks for return visitors, but new visitors will see the Skeleton Loader.
