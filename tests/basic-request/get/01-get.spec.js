import { test, expect } from "@playwright/test";
import envConfig from "../../../env/env-config";

test("should get status code 200", async ({ request }) => {
  const resposne = await request.get(`${envConfig.apiBaseURL}/authors`);
  expect(resposne.status()).toBe(200);
});

// content-type to be application/json; charset=utf-8
test("should have header content-type to be application/json charset=utf-8", async ({
  request,
}) => {
  const resposne = await request.get(`${envConfig.apiBaseURL}/authors`);
  expect(resposne.headers()["content-type"]).toBe(
    "application/json; charset=utf-8",
  );
});
