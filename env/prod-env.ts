import type { EnvConfig } from "../types/env-types";

const prodEnv: EnvConfig = {
  baseURL: "http://localhost:5173",
  apiBaseURL: "http://localhost:3000/api",
  envName: "Prod env",

  // browser and test configuration
  headless: false,
  screenshot: "on",
};

export default prodEnv;
