import { sign } from "jsonwebtoken";

export default function generateJWT(
  payload: { id: string },
  type: "verification" | "client" | "password" | "sensitive"
) {
  if (
    !process.env.JWT_ID_SECRET_KEY ||
    !process.env.JWT_PASSWORD_SECRET_KEY ||
    !process.env.JWT_VERIFICATION_SECRET_KEY
  )
    throw new Error("Required .env variables does not exist.");
  else {
    switch (type) {
      case "client":
        return sign(payload, process.env.JWT_ID_SECRET_KEY);
      case "verification":
        return sign(payload, process.env.JWT_VERIFICATION_SECRET_KEY, {
          expiresIn: "1 week",
        });
      case "password":
        return sign(payload, process.env.JWT_PASSWORD_SECRET_KEY, {
          expiresIn: "3 hours",
        });
    }
  }
}
