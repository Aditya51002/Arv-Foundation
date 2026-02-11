// Central API config and image service for connecting to MongoDB backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Image API ───

/** Fetch all gallery images */
export const fetchAllImages = async () => {
  const res = await fetch(`${API_BASE}/images`);
  if (!res.ok) throw new Error('Failed to fetch images');
  return res.json();
};

/** Fetch images by placement prefix (e.g. "work:orphanage-support") */
export const fetchImagesByPlacement = async (prefix) => {
  const res = await fetch(`${API_BASE}/images/placement/${encodeURIComponent(prefix)}`);
  if (!res.ok) throw new Error('Failed to fetch placed images');
  return res.json();
};

/** Fetch all placed images across all pages */
export const fetchAllPlacedImages = async () => {
  const res = await fetch(`${API_BASE}/images/placed`);
  if (!res.ok) throw new Error('Failed to fetch placed images');
  return res.json();
};

/** Upload images to MongoDB */
export const uploadImages = async (images) => {
  const res = await fetch(`${API_BASE}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ images }),
  });
  if (!res.ok) throw new Error('Failed to upload images');
  return res.json();
};

/** Assign an image to a specific page slot */
export const assignImagePlacement = async (imageId, placement) => {
  const res = await fetch(`${API_BASE}/images/${imageId}/placement`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placement }),
  });
  if (!res.ok) throw new Error('Failed to assign image');
  return res.json();
};

/** Remove an image from MongoDB */
export const deleteImage = async (imageId) => {
  const res = await fetch(`${API_BASE}/images/${imageId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete image');
  return res.json();
};
