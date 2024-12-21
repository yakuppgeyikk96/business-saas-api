import AuthRequest from "@/types/auth/AuthRequest";
import { UnauthorizedError } from "@/types/error";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError("Please authenticate");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded as { id: string };

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};
