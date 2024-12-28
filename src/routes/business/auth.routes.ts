import { authController } from "@/controllers/auth.controller";
import { auth } from "@/middleware/auth";
import { validateResource } from "@/middleware/validateResource";
import { loginSchema } from "@/schemas/auth/login.schema";
import { registerSchema } from "@/schemas/auth/register.schema";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  validateResource(registerSchema),
  authController.register
);

router.post("/login", validateResource(loginSchema), authController.login);

router.get("/me", auth, authController.getMe);

export default router;
