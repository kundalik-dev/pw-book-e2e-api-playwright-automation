// types/api/login.ts

/** Body to send to POST /auth/login */
export type LoginRequest = {
  email: string;
  password: string;
};

/** User object in the success response */
export type LoginUser = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

/** Response body received from POST /auth/login (200) */
export type LoginResponse = {
  user: LoginUser;
  accessToken: string;
  refreshToken: string;
};

/** Error response body */
export type LoginErrorResponse = {
  error: {
    message: string;
    code: string;
  };
};
