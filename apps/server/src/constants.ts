export type SIGNIN_METHODS = "facebook" | "google" | "native";

const development = process.env.NODE_ENV !== "production";

export const CLIENT_URL = development
  ? "http://localhost:3000"
  : "https://www.wellfare.space";
