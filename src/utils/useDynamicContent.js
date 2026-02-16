/**
 * Custom hook for fetching and managing dynamic content
 * Provides content with fallbacks and caching
 */

import { useState, useEffect, useRef } from "react";
import { fetchAllContent } from "./contentApi.js";

// Content cache to avoid repeated API calls
const contentCache = {
  data: null,
  timestamp: 0,
  expiry: 5 * 60 * 1000, // 5 minutes cache
};

/**
 * Hook to get dynamic content for a specific key
 * @param {string} contentKey - Format: "page:section:field"
 * @param {string} fallback - Fallback content if dynamic content not available
 * @returns {string} The content value
 */
export const useDynamicContent = (contentKey, fallback = "") => {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const now = Date.now();
        if (contentCache.data && (now - contentCache.timestamp) < contentCache.expiry) {
          if (isMountedRef.current) {
            const dynamicContent = contentCache.data[contentKey];
            setContent(dynamicContent?.value || fallback);
            setLoading(false);
          }
          return;
        }

        // Fetch fresh data
        const allContent = await fetchAllContent();
        contentCache.data = allContent;
        contentCache.timestamp = now;

        if (isMountedRef.current) {
          const dynamicContent = allContent[contentKey];
          setContent(dynamicContent?.value || fallback);
          setLoading(false);
        }
      } catch (error) {
        console.warn(`Failed to load dynamic content for ${contentKey}:`, error);
        if (isMountedRef.current) {
          setContent(fallback);
          setLoading(false);
        }
      }
    };

    loadContent();
  }, [contentKey, fallback]);

  return { content, loading };
};

/**
 * Hook to get multiple content items at once
 * @param {Array} contentKeys - Array of content key strings
 * @param {Object} fallbacks - Object with contentKey: fallback mappings
 * @returns {Object} Object with contentKey: content mappings and loading state
 */
export const useBulkDynamicContent = (contentKeys, fallbacks = {}) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const now = Date.now();
        if (contentCache.data && (now - contentCache.timestamp) < contentCache.expiry) {
          if (isMountedRef.current) {
            const result = {};
            contentKeys.forEach(key => {
              const dynamicContent = contentCache.data[key];
              result[key] = dynamicContent?.value || fallbacks[key] || "";
            });
            setContent(result);
            setLoading(false);
          }
          return;
        }

        // Fetch fresh data
        const allContent = await fetchAllContent();
        contentCache.data = allContent;
        contentCache.timestamp = now;

        if (isMountedRef.current) {
          const result = {};
          contentKeys.forEach(key => {
            const dynamicContent = allContent[key];
            result[key] = dynamicContent?.value || fallbacks[key] || "";
          });
          setContent(result);
          setLoading(false);
        }
      } catch (error) {
        console.warn(`Failed to load bulk dynamic content:`, error);
        if (isMountedRef.current) {
          const result = {};
          contentKeys.forEach(key => {
            result[key] = fallbacks[key] || "";
          });
          setContent(result);
          setLoading(false);
        }
      }
    };

    if (contentKeys.length > 0) {
      loadContent();
    }
  }, [JSON.stringify(contentKeys), JSON.stringify(fallbacks)]);

  return { content, loading };
};

/**
 * Hook for section-specific content (e.g., all work page content)
 * @param {string} page - Page name (e.g., "work", "initiative")
 * @param {string} section - Section name (e.g., "orphanage-support")
 * @param {Object} fallbacks - Object with field: fallback mappings
 * @returns {Object} Object with field: content mappings and loading state
 */
export const useSectionContent = (page, section, fallbacks = {}) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const now = Date.now();
        if (contentCache.data && (now - contentCache.timestamp) < contentCache.expiry) {
          if (isMountedRef.current) {
            const result = {};
            const prefix = `${page}:${section}:`;
            
            // Find all content keys for this section
            Object.keys(contentCache.data).forEach(key => {
              if (key.startsWith(prefix)) {
                const field = key.substring(prefix.length);
                result[field] = contentCache.data[key]?.value || fallbacks[field] || "";
              }
            });
            
            setContent(result);
            setLoading(false);
          }
          return;
        }

        // Fetch fresh data
        const allContent = await fetchAllContent();
        contentCache.data = allContent;
        contentCache.timestamp = now;

        if (isMountedRef.current) {
          const result = {};
          const prefix = `${page}:${section}:`;
          
          // Find all content keys for this section
          Object.keys(allContent).forEach(key => {
            if (key.startsWith(prefix)) {
              const field = key.substring(prefix.length);
              result[field] = allContent[key]?.value || fallbacks[field] || "";
            }
          });
          
          setContent(result);
          setLoading(false);
        }
      } catch (error) {
        console.warn(`Failed to load section content for ${page}:${section}:`, error);
        if (isMountedRef.current) {
          setContent(fallbacks);
          setLoading(false);
        }
      }
    };

    loadContent();
  }, [page, section, JSON.stringify(fallbacks)]);

  return { content, loading };
};

/**
 * Utility function to clear content cache (useful for admin updates)
 */
export const clearContentCache = () => {
  contentCache.data = null;
  contentCache.timestamp = 0;
};

/**
 * Utility function to update content cache (useful for optimistic updates)
 */
export const updateContentCache = (contentKey, newValue) => {
  if (contentCache.data) {
    contentCache.data[contentKey] = {
      ...contentCache.data[contentKey],
      value: newValue,
      updatedAt: new Date().toISOString()
    };
  }
};