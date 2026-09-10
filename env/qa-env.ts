import type { EnvConfig } from "../types/env-types";

const qaEnv: EnvConfig = {
  baseURL: "http://localhost:5173",
  apiBaseURL: "http://localhost:3000/api",
  envName: "qa Env",
};

export default qaEnv;
