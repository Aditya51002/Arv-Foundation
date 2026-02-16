/**
 * Content API utilities for managing editable page content
 * Similar to imageApi.js but for text content management
 * Content is stored in JSON files on the server, not in database
 */

// API base URL - using localhost for development, replace with your server URL
const API_BASE = "http://localhost:5000";

/**
 * Fetch all content data from the server
 * Returns object with content organized by page:section:field keys
 */
export const fetchAllContent = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Admin authentication required");

    const response = await fetch(`${API_BASE}/api/admin/content`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content || {};
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};

/**
 * Update content for a specific key
 * @param {string} contentKey - Format: "page:section:field"
 * @param {string} value - The new content value
 * @param {string} type - Content type (text, textarea, richtext)
 */
export const updateContent = async (contentKey, value, type = "text") => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Admin authentication required");

    const response = await fetch(`${API_BASE}/api/admin/content/${encodeURIComponent(contentKey)}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        value, 
        type,
        updatedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update content: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};

/**
 * Batch update multiple content items
 * @param {Array} updates - Array of {contentKey, value, type} objects
 */
export const batchUpdateContent = async (updates) => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Admin authentication required");

    const response = await fetch(`${API_BASE}/api/admin/content/batch`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        updates,
        updatedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to batch update content: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error batch updating content:", error);
    throw error;
  }
};

/**
 * Get content for a specific key with fallback to default
 * @param {string} contentKey - Format: "page:section:field"
 * @param {string} defaultValue - Fallback value if content not found
 */
export const getContent = async (contentKey, defaultValue = "") => {
  try {
    const allContent = await fetchAllContent();
    return allContent[contentKey]?.value || defaultValue;
  } catch (error) {
    console.warn(`Failed to get content for key ${contentKey}, using default:`, error);
    return defaultValue;
  }
};

/**
 * Reset content to default values (from original data files)
 * @param {string} page - Optional page to reset (if not provided, resets all)
 */
export const resetContentToDefaults = async (page = null) => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Admin authentication required");

    const url = page 
      ? `${API_BASE}/api/admin/content/reset/${encodeURIComponent(page)}`
      : `${API_BASE}/api/admin/content/reset`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to reset content: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting content:", error);
    throw error;
  }
};

/**
 * Check if content exists for a specific key
 * @param {string} contentKey - Format: "page:section:field"
 */
export const hasContent = async (contentKey) => {
  try {
    const allContent = await fetchAllContent();
    return !!allContent[contentKey];
  } catch (error) {
    return false;
  }
};

/**
 * Get content statistics
 */
export const getContentStats = async () => {
  try {
    const allContent = await fetchAllContent();
    const totalSlots = Object.keys(allContent).length;
    const filledSlots = Object.values(allContent).filter(item => item.value && item.value.trim()).length;
    
    return {
      total: totalSlots,
      filled: filledSlots,
      empty: totalSlots - filledSlots,
      percentage: totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0
    };
  } catch (error) {
    console.error("Error getting content stats:", error);
    return { total: 0, filled: 0, empty: 0, percentage: 0 };
  }
};