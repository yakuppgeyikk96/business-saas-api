import AuthRequest from "@/types/auth/AuthRequest";
import { UnauthorizedError } from "@/types/error";
import { UserType } from "@/types/user/UserType";
import { NextFunction, Response } from "express";

export const checkBusinessUser = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  if (req.user?.userType !== UserType.BUSINESS) {
    throw new UnauthorizedError("Only business users can perform this action");
  }

  next();
};
