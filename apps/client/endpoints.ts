const development = process.env.NODE_ENV !== "production";

export const SERVER_URL = development
  ? "http://localhost:4000"
  : "https://wellfare-server.onrender.com";

export const CLIENT_URL = development
  ? "http://localhost:3000"
  : "https://development.dc2dwwp55mwts.amplifyapp.com";
