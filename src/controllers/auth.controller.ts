import { asyncHandler } from "@/middleware/errorHandler";
import { LoginInput } from "@/schemas/auth/login.schema";
import { RegisterInput } from "@/schemas/auth/register.schema";
import { authService } from "@/services/auth.service";
import AuthRequest from "@/types/auth/AuthRequest";
import createApiResponse from "@/utils/createApiResponse";
import { Request, Response } from "express";

export const authController = {
  register: asyncHandler(
    async (req: Request<{}, {}, RegisterInput>, res: Response) => {
      const result = await authService.register(req.body);

      const response = createApiResponse(
        "success",
        result,
        "User registered successfully"
      );

      res.status(201).json(response);
    }
  ),
  login: asyncHandler(
    async (req: Request<{}, {}, LoginInput>, res: Response) => {
      const result = await authService.login(req.body);

      const response = createApiResponse(
        "success",
        result,
        "User logged in successfully"
      );

      res.json(response);
    }
  ),
  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getUserById(req.user!.id);

    const response = createApiResponse(
      "success",
      user,
      "User retrieved successfully"
    );

    res.json(response);
  }),
};
