import type { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  ServerHealthResponse,
  DbHealthResponse,
} from "../../types/api/health";
import { getApi } from "./api-helpers";
import { APIRoutes } from "../../test-data/routes-data";

/**
 * getServerHealth is a helper function to get the health of the backend API
 * @param request - The request context
 * @returns The response and body from the API
 */
async function getServerHealth(
  request: APIRequestContext,
): Promise<{ response: APIResponse; body: ServerHealthResponse }> {
  const response = await getApi(request, APIRoutes.health);
  const body = (await response.json()) as ServerHealthResponse;
  return { response, body };
}

/**
 * getDbHealth is a helper function to get the health of the database API
 * @param request - The request context
 * @returns The response and body from the API
 */
async function getDbHealth(
  request: APIRequestContext,
): Promise<{ response: APIResponse; body: DbHealthResponse }> {
  const response = await getApi(request, APIRoutes.dbHealth);
  const body = (await response.json()) as DbHealthResponse;
  return { response, body };
}

export { getServerHealth, getDbHealth };
