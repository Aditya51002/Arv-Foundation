import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role = "user" }) => {
  const location = useLocation();

  // Choose token key based on role
  const tokenKey = role === "admin" ? "adminToken" : "arv_user_token";
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem(tokenKey);
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  } catch {
    localStorage.removeItem(tokenKey);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
