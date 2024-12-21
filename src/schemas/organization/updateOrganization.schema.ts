// schemas/organization/updateOrganization.schema.ts
import { z } from "zod";

export const updateOrganizationSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Organization id is required",
    }),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters")
      .optional(),
  }),
});

export type UpdateOrganizationInput = z.TypeOf<
  typeof updateOrganizationSchema
>["body"];
