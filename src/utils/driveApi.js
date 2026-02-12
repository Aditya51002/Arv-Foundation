import { API_URL } from "../config";

// Matches app.use("/api/drives", ...) and app.use("/api/admin/drives", ...) in server.js
const PUBLIC_BASE = `${API_URL}/api/drives`;
const ADMIN_BASE = `${API_URL}/api/admin/drives`;

const getToken = () => localStorage.getItem("adminToken");

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

// 🔓 PUBLIC: Used by Normal Users
export const getDrives = async () => {
  const res = await fetch(`${PUBLIC_BASE}/public`); // Matches router.get("/public")
  if (!res.ok) throw new Error("Failed to load drives");
  return res.json();
};

// 🔒 ADMIN: Used by Dashboard
export const getAllDrivesAdmin = async () => {
  const res = await fetch(ADMIN_BASE, {
    headers: authHeaders() // Requires adminToken
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

export const toggleDriveActive = async (id) => {
  const res = await fetch(`${ADMIN_BASE}/toggle/${id}`, {
    method: "PUT", // Matches router.put("/toggle/:id")
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Toggle failed");
  return res.json();
};