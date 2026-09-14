// health.get.ts
type HealthApiData = {
  endpoint: string;
  expectedStatusCode: number;
  expectedContentType: string;
  expectedBody: {
    status: string;
  };
  maxResponseTime: number;
};

export const healthApiData: HealthApiData = {
  endpoint: "/health",
  expectedStatusCode: 200,
  expectedContentType: "application/json; charset=utf-8",
  expectedBody: { status: "ok" },
  maxResponseTime: 500,
};
