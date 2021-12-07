const development = process.env.NODE_ENV !== "production";

export const CLIENT_URL = development
  ? "https://localhost:3000/"
  : "http://wellfare.vercel.app/";
