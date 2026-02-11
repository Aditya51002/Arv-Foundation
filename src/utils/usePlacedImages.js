import { useState, useEffect } from "react";
import { fetchImagesByPlacement } from "./imageApi.js";

/**
 * Hook to fetch images assigned to a specific page:section.
 * Returns an array of 3 image URLs (or null for empty slots).
 *
 * @param {string} page   - e.g. "work", "initiative", "about", "partner"
 * @param {string} section - e.g. "orphanage-support", "volunteers"
 * @param {number} slotCount - number of slots (default 3)
 */
export const usePlacedImages = (page, section, slotCount = 3) => {
  const [images, setImages] = useState(Array(slotCount).fill(null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!page || !section) return;

    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const prefix = `${page}:${section}`;
        const data = await fetchImagesByPlacement(prefix);

        const slots = Array(slotCount).fill(null);
        data.forEach((img) => {
          if (!img.placement) return;
          const parts = img.placement.split(":");
          const slotIndex = parseInt(parts[2], 10);
          if (slotIndex >= 0 && slotIndex < slotCount) {
            slots[slotIndex] = img.url;
          }
        });

        if (!cancelled) setImages(slots);
      } catch (err) {
        console.error(`Failed to load images for ${page}:${section}`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [page, section, slotCount]);

  return { images, loading };
};
