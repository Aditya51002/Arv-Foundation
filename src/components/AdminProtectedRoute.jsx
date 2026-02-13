import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("adminToken"); // admin token

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  } catch {
    localStorage.removeItem("adminToken");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminProtectedRoute;
