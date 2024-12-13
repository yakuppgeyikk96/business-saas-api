// src/schemas/category/updateCategory.schema.ts
import { z } from "zod";

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Category id is required",
    }),
  }),
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

export type UpdateCategoryInput = z.TypeOf<typeof updateCategorySchema>["body"];
