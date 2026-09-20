import { test, expect } from "@playwright/test";
import { assertJsonSchema } from "../../../utils/jsonSchemaValidator";
import { loginUser } from "../../../utils/api/login.api";
import { loginUsers } from "../../../test-data/api/login/login-api-data";
import loginResponseSchema from "../../../test-data/api/login/login-response-schema.json";
import {
  LoginErrorResponse,
  LoginResponse,
} from "../../../types/api/login-types";

test.describe("POST /login @api @smoke @login", () => {
  test("should login with valid credential", async ({ request }) => {
    const { response, body } = await loginUser(request, {
      email: loginUsers.valid.email,
      password: loginUsers.valid.password,
    });
    expect(response.status()).toBe(200);
    assertJsonSchema(loginResponseSchema, body);
    expect((body as LoginResponse).user.email).toBe(loginUsers.valid.email);
  });

  // negatives — data-driven
  for (const user of loginUsers.invalid) {
    test(`should fail when ${user.testCase}`, async ({ request }) => {
      const { response, body } = await loginUser(request, {
        email: user.email,
        password: user.password,
      });
      expect(response.status()).toBe(user.expectedStatus);
      expect((body as LoginErrorResponse).error.code).toBe(
        user.expectedError.code,
      );
      expect((body as LoginErrorResponse).error.message).toBe(
        user.expectedError.message,
      );
    });
  }
});
