import dotenv from "dotenv";
import path from "path";
import prodEnv from "./prod-env";
import qaEnv from "./qa-env";
import { getEnvConfig } from "./get-env-config";
import type { EnvCollection } from "../types/env-types";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const envCollection: EnvCollection = {
  QA: qaEnv,
  PROD: prodEnv,
};

const envConfig = getEnvConfig(envCollection, process.env.ENV);

export default envConfig;
