import { z } from "zod";
import { createOrganizationSchema } from "./createOrganization.schema";
import { updateOrganizationSchema } from "./updateOrganization.schema";

export type CreateOrganizationInput = z.TypeOf<
  typeof createOrganizationSchema
>["body"];

export type UpdateOrganizationInput = z.TypeOf<
  typeof updateOrganizationSchema
>["body"];
