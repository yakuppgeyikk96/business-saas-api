import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .trim(),
  }),
});

export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>["body"];
