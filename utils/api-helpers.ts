import { type APIResponse } from "@playwright/test";
import envConfig from "../env/env-config";

function apiBaseURL(params: string): string {
  return envConfig.apiBaseURL + params;
}

function getHeader(response: APIResponse, name: string): string | undefined {
  return response.headers()[name.toLowerCase()];
}

export { apiBaseURL, getHeader };
