import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthed } from "../utils/adminAuth.js";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();

	if (!isAdminAuthed()) {
		// TODO: Replace mock auth with JWT API
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
