const development = process.env.NODE_ENV !== "production";

export const SERVER_URL = development
  ? "http://localhost:4000"
  : "http://localhost:4000";
