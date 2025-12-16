import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "./env";

export const signToken = (
  payload: object,
  expiresIn: Exclude<SignOptions["expiresIn"], undefined>
) => jwt.sign(payload, env.JWT_SECRET, { expiresIn });

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET);
