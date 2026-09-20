import "../utils/env-helpers/load-dotenv";
import type { EnvConfig } from "../types/env-types";
import { requireEnv } from "../utils/env-helpers/require-env";

const qaEnv: EnvConfig = {
  baseURL: "http://localhost:5173",
  apiBaseURL: "http://localhost:3000",
  envName: "qa Env",

  // Read from .env on access (not hardcoded). Deferred so Playwright
  // config analysis does not fail before dotenv has loaded.
  get validEmail() {
    return requireEnv("EMAIL");
  },
  get validPassword() {
    return requireEnv("PASSWORD");
  },

  // browser and test configuration
  headless: true,
  screenshot: "on",
};

export default qaEnv;
