import { verify } from "jsonwebtoken";

export default function verifyJWT(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET_KEY!);
  } catch {
    return null;
  }
}
