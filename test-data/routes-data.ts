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
  login: string;
}

export const APIRoutes: APIRoutesType = {
  login: "/login",
};
