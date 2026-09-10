import { test, expect } from "@playwright/test";
import envConfig from "../../env/env-config";

test("should have env file with env values defined", async ({}) => {
  console.log("env name is", envConfig.envName);
  console.log("env name is", envConfig.apiBaseURL);
  console.log("env name is", envConfig.baseURL);

  expect(envConfig.baseURL).toBeDefined();
  expect(envConfig.apiBaseURL).toBeDefined();
  expect(envConfig.envName).toBeDefined();
});
