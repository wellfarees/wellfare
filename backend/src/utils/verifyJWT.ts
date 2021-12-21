import { verify } from "jsonwebtoken";

export default function verifyJWT(
  token: string,
  type: "verification" | "client" | "password"
) {
  if (
    !process.env.JWT_ID_SECRET_KEY ||
    !process.env.JWT_PASSWORD_SECRET_KEY ||
    !process.env.JWT_VERIFICATION_SECRET_KEY
  )
    throw new Error("Required .env variables does not exist.");

  switch (type) {
    case "client":
      try {
        return verify(token, process.env.JWT_ID_SECRET_KEY);
      } catch {
        return null;
      }
    case "verification":
      try {
        return verify(token, process.env.JWT_VERIFICATION_SECRET_KEY);
      } catch {
        return null;
      }

    case "password":
      try {
        return verify(token, process.env.JWT_PASSWORD_SECRET_KEY);
      } catch {
        return null;
      }
    default:
      return null;
  }
}
