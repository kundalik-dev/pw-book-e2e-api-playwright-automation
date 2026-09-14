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

// Database health
export type DbHealthApiData = {
  endpoint: string;
  expectedStatusCode: number;
  expectedContentType: string;
  expectedBody: {
    status: string;
    dbConnected: boolean;
  };
  maxResponseTime: number;
};

export const dbHealthApiData: DbHealthApiData = {
  endpoint: "/health/db",
  expectedStatusCode: 200,
  expectedContentType: "application/json; charset=utf-8",
  expectedBody: {
    status: "ok",
    dbConnected: true,
  },
  maxResponseTime: 500,
};
