// middleware/errorHandler.ts
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "@/types/error";
import createApiResponse from "@/utils/createApiResponse";
import { Error as MongooseError } from "mongoose";

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = "Something went wrong";
  let errorData = null;

  // ZodError handling
  if (err instanceof ZodError) {
    statusCode = 400;
    errorMessage = "Validation failed";
    errorData = err.errors;
  }
  // Custom API Errors
  else if ("statusCode" in err && "status" in err) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  // Mongoose validation errors
  else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    errorMessage = "Validation failed";
    errorData = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // Mongoose duplicate key error
  else if ("code" in err && err.code === 11000) {
    statusCode = 400;
    errorMessage = "Duplicate field value entered";
  }
  // Beklenmeyen hatalar için log
  else {
    console.error("Error:", err);
  }

  // Her durumda JSON yanıt dön
  res
    .status(statusCode)
    .json(createApiResponse("error", errorData, errorMessage));
};
