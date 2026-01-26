export const storeToken = (token) => {
  // Use the single 'token' key across the app so other services (apiService, RoleService)
  // can read the same value.
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
