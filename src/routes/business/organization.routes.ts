import { organizationController } from "@/controllers/organization.controller";
import { auth } from "@/middleware/auth";
import { hasPermission } from "@/middleware/permission";
import { validateResource } from "@/middleware/validateResource";
import { createOrganizationSchema } from "@/schemas/organization/createOrganization.schema";
import { updateOrganizationSchema } from "@/schemas/organization/updateOrganization.schema";
import { OrganizationPermission } from "@/types/organization/Permission";
import { Router } from "express";

const router = Router();

/**
 * Crete a new organization
 */
router.post(
  "/",
  validateResource(createOrganizationSchema),
  organizationController.createOrganization
);

/**
 * Get user organizations
 */
router.get("/me", organizationController.getUserOrganizations);

/**
 * Get organization by id
 */
router.get(
  "/:id",
  hasPermission(OrganizationPermission.VIEW_ORGANIZATION),
  organizationController.getOrganization
);

/**
 * Update organization by id
 */
router.patch(
  "/:id",
  hasPermission(OrganizationPermission.UPDATE_ORGANIZATION),
  validateResource(updateOrganizationSchema),
  organizationController.updateOrganization
);

/*
 * Delete organization by id
 */
router.delete(
  "/:id",
  hasPermission(OrganizationPermission.DELETE_ORGANIZATION),
  organizationController.deleteOrganization
);

export default router;
