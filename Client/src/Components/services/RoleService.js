
export const storeToken = (t) => localStorage.setItem("token", t);
export const getToken = () => localStorage.getItem("token");
export const clearToken = () => localStorage.removeItem("token");

export const storeRole = (r) => localStorage.setItem("role", r);
export const getRole = () => localStorage.getItem("role");
export const clearRole = () => localStorage.removeItem("role");

export const ROLES = {

     ADMIN: "admin", USER: "user"
    
};
