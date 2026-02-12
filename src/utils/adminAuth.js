const ADMIN_AUTH_KEY = "arv_admin_auth";
const ADMIN_TOKEN_KEY = "adminToken";

export const isAdminAuthed = () => {
	if (typeof window === "undefined") return false;
	return !!localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const loginAdmin = (token) => {
	localStorage.setItem(ADMIN_AUTH_KEY, "true");
	localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const logoutAdmin = () => {
	localStorage.removeItem(ADMIN_AUTH_KEY);
	localStorage.removeItem(ADMIN_TOKEN_KEY);
};
