type EnvironmentName = "QA" | "PROD";

type ScreenshotMode = "off" | "on" | "only-on-failure" | "on-first-failure";
type VideoMode = "off" | "on" | "only-on-failure" | "on-first-failure";
type TraceMode = "off" | "on" | "only-on-failure" | "on-first-failure";
type SlowMoMode = number;
type TimeoutMode = number;
type ViewportMode = {
  width: number;
  height: number;
};

interface EnvConfig {
  baseURL: string;
  apiBaseURL: string;
  envName: string;

  // browser and test configurations
  headless: boolean;
  screenshot: ScreenshotMode;
  video?: VideoMode;
  trace?: TraceMode;
  slowMo?: SlowMoMode;
  timeout?: TimeoutMode;
  viewport?: ViewportMode;
}

type EnvCollection = Record<EnvironmentName, EnvConfig>;

export { EnvConfig, EnvCollection };
