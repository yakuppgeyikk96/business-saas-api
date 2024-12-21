import { organizationMemberController } from "@/controllers/organizationMember.controller";
import { auth } from "@/middleware/auth";
import { hasPermission } from "@/middleware/permission";
import { validateResource } from "@/middleware/validateResource";
import {
  createOrganizationMemberSchema,
  updateOrganizationMemberSchema,
} from "@/schemas/organizationMember";
import { OrganizationPermission } from "@/types/organization/Permission";
import { Router } from "express";

const router = Router();

router.use(auth);

/**
 * Add a member to an organization
 */
router.post(
  "/",
  hasPermission(OrganizationPermission.ADD_MEMBER),
  validateResource(createOrganizationMemberSchema),
  organizationMemberController.addMember
);

/**
 * List all members of an organization
 */
router.get(
  "/organization/:organizationId",
  hasPermission(OrganizationPermission.VIEW_MEMBERS),
  organizationMemberController.getOrganizationMembers
);

/**
 * Get a member of an organization
 */
router.get(
  "/:id",
  hasPermission(OrganizationPermission.VIEW_MEMBERS),
  organizationMemberController.getMember
);

/**
 * Update a member of an organization
 */
router.patch(
  "/:id",
  hasPermission(OrganizationPermission.UPDATE_MEMBER),
  validateResource(updateOrganizationMemberSchema),
  organizationMemberController.updateMember
);

/**
 * Remove a member from an organization
 */
router.delete(
  "/:id",
  hasPermission(OrganizationPermission.REMOVE_MEMBER),
  organizationMemberController.removeMember
);

export default router;
