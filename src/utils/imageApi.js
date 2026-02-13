import { API_URL } from "../config"; 

// Define separate bases to prevent route shadowing
const PUBLIC_BASE = `${API_URL}/api/images`; 
const ADMIN_BASE = `${API_URL}/api/admin/images`; 

// FIXED: Key changed to adminToken to match Login logic
const getToken = () => localStorage.getItem("adminToken"); 

// Helper: Build auth headers
const authHeaders = () => ({
  "Content-Type": "application/json", 
  "Authorization": `Bearer ${getToken()}` 
});

// ─────────────────────────────
// 🔓 PUBLIC ROUTES (For Website)
// ─────────────────────────────

/** Fetch all placed images for website display */
export const fetchAllPlacedImages = async () => {
  const res = await fetch(`${PUBLIC_BASE}/placed`); 
  if (!res.ok) throw new Error("Failed to fetch placed images"); 
  return res.json(); 
};

/** Fetch images by placement prefix */
export const fetchImagesByPlacement = async (prefix) => {
  const res = await fetch(`${PUBLIC_BASE}/placement/${encodeURIComponent(prefix)}`); 
  if (!res.ok) throw new Error("Failed to fetch placed images"); 
  return res.json(); 
};

// ─────────────────────────────
// 🔒 ADMIN ROUTES (For Dashboard)
// ─────────────────────────────

/** Fetch all images for Admin Gallery (Protected) */
export const fetchAllImages = async () => {
  const res = await fetch(ADMIN_BASE, { 
    method: "GET", 
    headers: authHeaders(), 
  });
  if (!res.ok) throw new Error("Unauthorized. Please login again."); 
  return res.json(); 
};

/** Upload images to MongoDB (Protected) */
export const uploadImages = async (imageDataArray) => {
  const res = await fetch(ADMIN_BASE, { 
    method: "POST", 
    headers: authHeaders(), 
    body: JSON.stringify({ images: imageDataArray }), 
  });

  if (!res.ok) throw new Error("Failed to upload images"); 
  return res.json(); 
};

/** Assign an image to a specific page slot (Protected) */
export const assignImagePlacement = async (imageId, placement) => {
  // FIXED: Changed method to PATCH to match backend router.patch
  const res = await fetch(`${ADMIN_BASE}/${imageId}/placement`, { 
    method: "PATCH", 
    headers: authHeaders(), 
    body: JSON.stringify({ placement }), 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to assign image");
  }
  return res.json(); 
};

/** Remove an image from MongoDB (Protected) */
export const deleteImage = async (imageId) => {
  const res = await fetch(`${ADMIN_BASE}/${imageId}`, { 
    method: "DELETE", 
    headers: {
      "Authorization": `Bearer ${getToken()}` 
    }
  });

  if (!res.ok) throw new Error("Failed to delete image"); 
  return res.json(); 
};