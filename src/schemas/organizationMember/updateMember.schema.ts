import { OrganizationPermission } from "@/types/organization/Permission";
import { OrganizationRole } from "@/types/organization/Role";
import { z } from "zod";

export const updateOrganizationMemberSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    role: z.nativeEnum(OrganizationRole).optional(),
    permissions: z.array(z.nativeEnum(OrganizationPermission)).optional(),
  }),
});

export type UpdateOrganizationMemberInput = z.TypeOf<
  typeof updateOrganizationMemberSchema
>["body"];
