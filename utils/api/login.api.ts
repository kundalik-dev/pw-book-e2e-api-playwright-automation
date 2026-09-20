import { APIRequestContext, APIResponse } from "@playwright/test";
import { postApi } from "./api-helpers";
import { APIRoutes } from "../../test-data/routes-data";
import {
  LoginErrorResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/api/login-types";

/** Login user and return response body
 * @param request - Playwright APIRequestContext
 * @param requestBody - LoginRequest body
 * @returns { response: APIResponse; body: LoginResponse | LoginErrorResponse }
 */
async function loginUser(
  request: APIRequestContext,
  requestBody: LoginRequest,
): Promise<{
  response: APIResponse;
  body: LoginResponse | LoginErrorResponse;
}> {
  const response = await postApi(request, APIRoutes.login, requestBody);
  const body = (await response.json()) as LoginResponse | LoginErrorResponse;
  return { response, body };
}

export { loginUser };
