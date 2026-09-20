import "../utils/load-dotenv";
import type { EnvConfig } from "../types/env-types";
import { requireEnv } from "../utils/require-env";

const prodEnv: EnvConfig = {
  baseURL: "http://localhost:5173",
  apiBaseURL: "http://localhost:3000",
  envName: "Prod env",

  get validEmail() {
    return requireEnv("EMAIL");
  },
  get validPassword() {
    return requireEnv("PASSWORD");
  },

  // browser and test configuration
  headless: false,
  screenshot: "on",
};

export default prodEnv;
