import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { HealthResponse } from "../../types/api/health"; 
import { getApi } from "./api-helpers";

/**
 * getHealth is a helper function to get the health of the API
 * @param request - The request context
 * @returns The response and body from the API
 */
 async function getHealth(
  request: APIRequestContext,
): Promise<{ response: APIResponse; body: HealthResponse }> {
  const response = await getApi(request, "/health");
  const body = (await response.json()) as HealthResponse;
  return { response, body };
}

export { getHealth };
