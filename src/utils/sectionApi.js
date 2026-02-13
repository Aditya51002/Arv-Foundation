import { API_URL } from "../config";

const API_BASE = `${API_URL}/api/sections`;

// FIXED: Use adminToken to match Login logic
const getToken = () => localStorage.getItem("adminToken");

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

export const fetchSections = async () => {
  const res = await fetch(API_BASE); // Public or private depending on backend
  if (!res.ok) throw new Error("Failed to fetch sections");
  return res.json();
};

export const toggleSection = async (id) => {
  const res = await fetch(`${API_BASE}/toggle/${id}`, {
    method: "PATCH", // Or PUT, depending on your backend route
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to toggle section");
  return res.json();
};

export const moveSection = async (id, direction) => {
  const res = await fetch(`${API_BASE}/move`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ id, direction }),
  });
  if (!res.ok) throw new Error("Failed to move section");
  return res.json();
};