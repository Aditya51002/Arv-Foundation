const USER_AUTH_KEY = "arv_user_auth";

export const isUserAuthed = () => {
	// TODO: Replace mock auth with JWT API
	if (typeof window === "undefined") return false;
	return localStorage.getItem(USER_AUTH_KEY) === "true";
};

export const loginUser = () => {
	// TODO: Replace mock auth with JWT API
	localStorage.setItem(USER_AUTH_KEY, "true");
};

export const logoutUser = () => {
	// TODO: Replace mock auth with JWT API
	localStorage.removeItem(USER_AUTH_KEY);
};

