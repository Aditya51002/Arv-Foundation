const ADMIN_AUTH_KEY = "arv_admin_auth";

export const isAdminAuthed = () => {
	// TODO: Replace mock auth with JWT API
	if (typeof window === "undefined") return false;
	return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
};

export const loginAdmin = () => {
	// TODO: Replace mock auth with JWT API
	localStorage.setItem(ADMIN_AUTH_KEY, "true");
};

export const logoutAdmin = () => {
	// TODO: Replace mock auth with JWT API
	localStorage.removeItem(ADMIN_AUTH_KEY);
};

