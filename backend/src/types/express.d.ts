import type { TokenPayload } from "@config/jwt";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
