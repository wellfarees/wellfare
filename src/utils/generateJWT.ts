import { sign } from "jsonwebtoken";

export default function generateJWT(payload: { id: number }) {
  if (!process.env.JWT_SECRET_KEY)
    throw new Error("JWT_SECRET_KEY .env variable does not exist.");
  else return sign(payload, process.env.JWT_SECRET_KEY);
}
