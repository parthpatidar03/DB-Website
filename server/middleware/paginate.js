/**
 * Pagination Helper
 * 
 * WHY THIS EXISTS:
 * Instead of sending ALL projects/members at once (which is slow on bad internet),
 * we send them in small chunks (pages). The frontend asks for page 1, then page 2, etc.
 * This reduces the initial payload size dramatically.
 * 
 * WHAT BREAKS IF REMOVED:
 * All data loads at once. With 50+ members and images, this could be 500KB+ on first load.
 * With pagination (6 items/page), each request is ~10-20KB — loads in <1 second even on 3G.
 * 
 * SIMPLER ALTERNATIVE:
 * You could just use Array.slice() inline in each route, but this helper avoids
 * repeating the same pagination logic in every route file.
 */

/**
 * Paginates an array of items
 * @param {Array} items - The full array to paginate
 * @param {number} page - Current page (1-indexed)
 * @param {number} limit - Items per page
 * @returns {{ data: Array, pagination: Object }}
 */
const paginate = (items, page = 1, limit = 6) => {
    // Ensure valid numbers
    const currentPage = Math.max(1, parseInt(page) || 1);
    const perPage = Math.min(50, Math.max(1, parseInt(limit) || 6));

    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return {
        data: items.slice(startIndex, endIndex),
        pagination: {
            page: currentPage,
            limit: perPage,
            total,
            totalPages,
            hasMore: currentPage < totalPages,
        },
    };
};

module.exports = { paginate };
