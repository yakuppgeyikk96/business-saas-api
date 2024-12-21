import { organizationController } from "@/controllers/organization.controller";
import { auth } from "@/middleware/auth";
import { validateResource } from "@/middleware/validateResource";
import { createOrganizationSchema } from "@/schemas/organization/createOrganization.schema";
import { updateOrganizationSchema } from "@/schemas/organization/updateOrganization.schema";
import { Router } from "express";

const router = Router();

/**
 * Use auth middleware for all organization routes
 */
router.use(auth);

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
router.get("/:id", organizationController.getOrganization);

/**
 * Update organization by id
 */
router.patch(
  "/:id",
  validateResource(updateOrganizationSchema),
  organizationController.updateOrganization
);

/*
 * Delete organization by id
 */
router.delete("/:id", organizationController.deleteOrganization);

export default router;
