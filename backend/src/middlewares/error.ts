import type { Request, Response, NextFunction } from "express";

export class ErrorRes extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // pass errors to Express error middleware
  };

export const errorHandler = (
  err: ErrorRes,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err); // log error for debugging

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
