const development = process.env.NODE_ENV !== "production";

export const CLIENT_URL = development
  ? "http://localhost:3000"
  : "https://wellfare.space";
