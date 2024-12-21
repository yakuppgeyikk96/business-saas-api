// schemas/organization/createOrganization.schema.ts
import { z } from "zod";

export const createOrganizationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters")
      .optional(),
  }),
});

export type CreateOrganizationInput = z.TypeOf<
  typeof createOrganizationSchema
>["body"];
