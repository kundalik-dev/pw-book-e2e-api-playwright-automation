import { APIResponse, APIRequestContext } from "@playwright/test";
import envConfig from "../../env/env-config";

/**
 * createApiEndpoint is a helper function to create the API endpoint
 * @param path - The path to the API endpoint
 * @returns The API endpoint
 */
function createApiEndpoint(path: string): string {
  return `${envConfig.apiBaseURL}${path}`;
}

/**
 * getHeader is a helper function to get a header from the response
 * @param response - The response from the API
 * @param name - The name of the header to get
 * @returns The value of the header
 */
function getHeader(response: APIResponse, name: string): string | undefined {
  return response.headers()[name.toLowerCase()];
}

/**
 * authHeaders is a helper function to add authentication headers to the request - Bearer Token
 * @param token - The token to add to the request
 * @returns The headers to add to the request
 */
export function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

/**
 * getApi is a helper function to make a GET request to the API
 * @param request - The request context
 * @param path - The path to the API endpoint
 * @param options - The options for the request
 * @returns The response from the API
 */
async function getApi(
  request: APIRequestContext,
  path: string,
  options?: { token?: string },
) {
  return request.get(createApiEndpoint(path), {
    headers: options?.token ? authHeaders(options.token) : undefined,
  });
}

/**
 * postApi is a helper function to make a POST request to the API
 * @param request - The request context
 * @param path - The path to the API endpoint
 * @param requestBody - The request body
 * @param options - The options for the request
 * @returns The response from the API
 */
async function postApi<TBody>(
  request: APIRequestContext,
  path: string,
  requestBody: TBody,
  options?: { token?: string },
) {
  return request.post(createApiEndpoint(path), {
    data: requestBody,
    headers: options?.token ? authHeaders(options.token) : undefined,
  });
}

export { createApiEndpoint, getHeader, getApi, postApi };
