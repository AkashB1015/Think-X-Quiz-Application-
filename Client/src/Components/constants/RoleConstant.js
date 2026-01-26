
export const ROLES = {

  ADMIN: "admin",
  STUDENT: "student",

};

export const DASHBOARD_ROUTES = {

  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.STUDENT]: "/student/dashboard",

};

export const ROLE_LABELS = {

  [ROLES.ADMIN]: "Admin",
  [ROLES.STUDENT]: "Student",
  
};
