// src/middleware/errorHandler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../types/error";

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  // Beklenmeyen hatalar için
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

// Async hata yakalama için wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
