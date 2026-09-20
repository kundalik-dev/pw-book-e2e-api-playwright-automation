import type { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  DbHealthResponse,
  HealthResponse,
} from "../../types/api/health-api-types";
import { ApiErrorResponse } from "../../types/api/error-response-types";
import { getApi } from "./api-helpers";
import { APIRoutes } from "../../test-data/routes-data";

/**
 * getServerHealth is a helper function to get the health of the backend API
 * @param request - The request context
 * @returns { response: APIResponse; body: HealthResponse } The response and body from the API
 */
async function getServerHealth(request: APIRequestContext): Promise<{
  response: APIResponse;
  body: HealthResponse | ApiErrorResponse;
}> {
  const response = await getApi(request, APIRoutes.health);
  const body = (await response.json()) as HealthResponse | ApiErrorResponse;
  return { response, body };
}

/**
 * getDbHealth is a helper function to get the health of the database API
 * @param request - The request context
 * @returns The response and body from the API
 */
async function getDbHealth(request: APIRequestContext): Promise<{
  response: APIResponse;
  body: DbHealthResponse | ApiErrorResponse;
}> {
  const response = await getApi(request, APIRoutes.dbHealth);
  const body = (await response.json()) as DbHealthResponse | ApiErrorResponse;
  return { response, body };
}

export { getServerHealth, getDbHealth };
