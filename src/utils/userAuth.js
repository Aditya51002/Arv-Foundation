const USER_TOKEN_KEY = "arv_user_token";

export const isUserAuthed = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(USER_TOKEN_KEY);
};

export const loginUser = (token) => {
  localStorage.setItem(USER_TOKEN_KEY, token);
};

export const logoutUser = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
};

export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN_KEY);
};
