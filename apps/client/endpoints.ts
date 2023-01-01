const development = process.env.NODE_ENV !== "production";

export const SERVER_URL = development
  ? "http://localhost:4000"
  : "https://wellfare-production.up.railway.app";

export const CLIENT_URL = development
  ? "http://localhost:3000"
  : "https://www.wellfare.space";
