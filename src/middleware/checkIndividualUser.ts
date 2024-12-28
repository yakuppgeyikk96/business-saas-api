import { NextFunction, Response } from "express";
import AuthRequest from "@/types/auth/AuthRequest";
import { UnauthorizedError } from "@/types/error";
import { UserType } from "@/types/user/UserType";

export const checkIndividualUser = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.userType !== UserType.INDIVIDUAL) {
    throw new UnauthorizedError(
      "Only individual users can access ecommerce site"
    );
  }
  next();
};
