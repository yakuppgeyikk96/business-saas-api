// schemas/auth/register.schema.ts
import { z } from "zod";
import { UserType } from "@/types/user/UserType";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    userType: z.nativeEnum(UserType, {
      required_error: "User type is required",
    }),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
