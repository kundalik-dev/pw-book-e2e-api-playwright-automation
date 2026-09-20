export interface UIRoutesType {
  login: string;
  register: string;
  dashboard: string;
}

export const UIRoutes: UIRoutesType = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};

// API Routes
export interface APIRoutesType {
  health: string;
  dbHealth: string;
  login: string;
}

export const APIRoutes: APIRoutesType = {
  health: "/api/health",
  dbHealth: "/api/health/db",
  login: "/api/auth/login",
};
