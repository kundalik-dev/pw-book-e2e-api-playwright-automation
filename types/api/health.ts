export type ServerHealthResponse = {
  status: string;
};

export type DbHealthResponse = {
  status: string;
  dbConnected: boolean;
};
