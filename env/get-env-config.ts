import type { EnvConfig, EnvCollection } from "../types/env-types";
import { hasOwnKey } from "../utils/object-utils";

export function getEnvConfig(
  collection: EnvCollection,
  envValue: string | undefined,
): EnvConfig {
  const environment = envValue?.trim().toUpperCase();

  if (!environment) {
    throw new Error("ENV variable is not configured.");
  }

  if (!hasOwnKey(collection, environment)) {
    const validEnvironments = Object.keys(collection).join(", ");

    throw new Error(
      `Invalid ENV value "${environment}". Valid values: ${validEnvironments}`,
    );
  }

  return collection[environment];
}
