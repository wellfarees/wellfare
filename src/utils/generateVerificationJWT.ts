import { sign } from "jsonwebtoken";

export default function generateVerificationJWT(payload: {
  id: string;
}): string {
  if (!process.env.JWT_SECRET_KEY)
    throw new Error("JWT_SECRET_KEY .env variable does not exist.");
  else
    return sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1 day",
    });
}
