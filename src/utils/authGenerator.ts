import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT as string;

export function createToken(payload: jwt.JwtPayload) {
  return jwt.sign(payload, JWT_SECRET);
}
