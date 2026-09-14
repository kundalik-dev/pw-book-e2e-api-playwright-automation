import type { EnvConfig } from "../types/env-types";

const qaEnv: EnvConfig = {
  baseURL: "http://localhost:5173",
  apiBaseURL: "http://localhost:3000/api",
  envName: "qa Env",

  // browser and test configuration
  headless: true,
  screenshot: "on",
};

export default qaEnv;
