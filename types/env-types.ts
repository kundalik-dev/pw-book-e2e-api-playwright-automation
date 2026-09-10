type EnvironmentName = "QA" | "PROD";

interface EnvConfig {
  baseURL: string;
  apiBaseURL: string;
  envName: string;
}

type EnvCollection = Record<EnvironmentName, EnvConfig>;

export { EnvConfig, EnvCollection };
