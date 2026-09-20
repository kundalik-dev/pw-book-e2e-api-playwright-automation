import { APIRequestContext, APIResponse } from "@playwright/test"; 
import { postApi } from "./api-helpers";
import { LoginRequest,LoginResponse } from "../../types/api/login-types";

/** Login user and return response body
 * @param request - Playwright APIRequestContext
 * @param data - LoginRequest
 * @returns { response: APIResponse; body: LoginResponse }
 */
async function loginUser(
  request: APIRequestContext,
  data: LoginRequest,
): Promise<{ response: APIResponse; body: LoginResponse }> {
  const response = await postApi(request, "/auth/login", data);
  const body = (await response.json()) as LoginResponse;
  return { response, body };
}

export { loginUser };
