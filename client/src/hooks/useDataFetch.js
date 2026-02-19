import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDataFetch Hook
 * 
 * Fetches data from the API with built-in caching and pagination support.
 * 
 * Features:
 * - Caching: Responses are cached in sessionStorage to prevent redundant network requests
 *   when navigating between pages.
 * - Pagination: Supports fetching specific pages and appending/replacing data.
 * - Error Handling: Graceful error states.
 * - Loading States: Tracks loading status.
 * - AbortController: Cancels pending requests on unmount or new request.
 * 
 * @param {string} endpoint - API endpoint (e.g., '/api/projects')
 * @param {Object} options - { page, limit, filters, ... }
 * @param {Array} dependencies - Dependency array to trigger re-fetch
 */
export const useDataFetch = (endpoint, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Cache key based on endpoint and options (stringified)
  // We exclude 'page' from cache key if we want to append data, 
  // but for simplicity, allow unique cache per page/filter combo.
  const queryParams = new URLSearchParams();

  if (options.page) queryParams.append('page', options.page);
  if (options.limit) queryParams.append('limit', options.limit);

  // Add filters to query params
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        queryParams.append(key, value);
      }
    });
  }

  // Add sort
  if (options.sort) queryParams.append('sort', options.sort);

  const queryString = queryParams.toString();
  const fullUrl = `${endpoint}${queryString ? `?${queryString}` : ''}`;

  // Ref to track if component is mounted
  const isMounted = useRef(true);

  // AbortController ref
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // 1. Check Cache (SessionStorage)
      // STRATEGY: Stale-While-Revalidate
      // If we have cached data, show it IMMEDIATELY, but continue to fetch fresh data in the background.
      const cacheKey = `db_cache_${fullUrl}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached && !forceRefresh) {
        try {
          const { data: cachedData, pagination: cachedPagination } = JSON.parse(cached);
          // We use the cached data immediately regardless of age (Stale-While-Revalidate)
          if (isMounted.current) {
            console.log("Serving from cache (background update pending)...");
            setData(cachedData);
            setPagination(cachedPagination);
            setLoading(false); // Stop showing skeleton
            // CRITICAL: Do NOT return here. Continue to fetch network data.
          }
        } catch (e) {
          console.warn("Invalid cache data", e);
          sessionStorage.removeItem(cacheKey);
        }
      }

      // 2. Fetch Network
      const response = await fetch(fullUrl, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (isMounted.current) {
        // Handle both paginated ({ data, pagination }) and non-paginated (Array/Object) responses
        const responseData = result.data || result;
        const responsePagination = result.pagination || null;

        // Update state with fresh data
        setData(responseData);
        setPagination(responsePagination);

        // 3. Set Cache
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({
            data: responseData,
            pagination: responsePagination,
            timestamp: Date.now()
          }));
        } catch (e) {
          // Quota exceeded or disabled
          console.warn('Cache storage failed', e);
        }

        setLoading(false);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      if (isMounted.current) {
        setError(err.message);
        setLoading(false);
        console.error('Fetch error:', err);
      }
    }
  }, [fullUrl]);

  // Initial Fetch
  useEffect(() => {
    isMounted.current = true;
    fetchData();

    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, ...dependencies]);

  return { data, loading, error, pagination, refetch: () => fetchData(true) };
};
