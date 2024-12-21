import { OrganizationPermission } from "@/types/organization/Permission";
import { OrganizationRole } from "@/types/organization/Role";
import { z } from "zod";

export const createOrganizationMemberSchema = z.object({
  body: z.object({
    organization: z.string({
      required_error: "Organization id is required",
    }),
    user: z.string({
      required_error: "User id is required",
    }),
    role: z.nativeEnum(OrganizationRole, {
      required_error: "Role is required",
    }),
    invitedBy: z.string().optional(),
    permissions: z.array(z.nativeEnum(OrganizationPermission)).optional(),
  }),
});

export type CreateOrganizationMemberInput = z.infer<
  typeof createOrganizationMemberSchema
>["body"];
