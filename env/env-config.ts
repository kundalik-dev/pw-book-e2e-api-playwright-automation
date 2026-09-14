import "../utils/load-dotenv";
import prodEnv from "./prod-env";
import qaEnv from "./qa-env";
import { getEnvConfig } from "../utils/get-env-config";
import type { EnvCollection } from "../types/env-types";

const envCollection: EnvCollection = {
  QA: qaEnv,
  PROD: prodEnv,
};

const envConfig = getEnvConfig(envCollection, process.env.ENV);

// console.log(`🚀🚀 Test Running in ${envConfig.envName}.`);

export default envConfig;
