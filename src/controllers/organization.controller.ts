import { asyncHandler } from "@/middleware/errorHandler";
import { organizationService } from "@/services/organization.service";
import AuthRequest from "@/types/auth/AuthRequest";
import createApiResponse from "@/utils/createApiResponse";
import { Response } from "express";

export const organizationController = {
  createOrganization: asyncHandler(async (req: AuthRequest, res: Response) => {
    const organization = await organizationService.createOrganization({
      ...req.body,
      owner: req.user!.id,
    });

    const response = createApiResponse(
      "success",
      organization,
      "Organization created successfully"
    );
    res.status(201).json(response);
  }),

  getOrganization: asyncHandler(async (req: AuthRequest, res: Response) => {
    const organization = await organizationService.getOrganization(
      req.params.id,
      req.user!.id
    );

    const response = createApiResponse(
      "success",
      organization,
      "Organization retrieved successfully"
    );
    res.json(response);
  }),

  getUserOrganizations: asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const organizations = await organizationService.getUserOrganizations(
        req.user!.id
      );

      const response = createApiResponse(
        "success",
        organizations,
        "Organizations retrieved successfully"
      );
      res.json(response);
    }
  ),

  updateOrganization: asyncHandler(async (req: AuthRequest, res: Response) => {
    const organization = await organizationService.updateOrganization(
      req.params.id,
      req.user!.id,
      req.body
    );

    const response = createApiResponse(
      "success",
      organization,
      "Organization updated successfully"
    );
    res.json(response);
  }),

  deleteOrganization: asyncHandler(async (req: AuthRequest, res: Response) => {
    await organizationService.deleteOrganization(req.params.id, req.user!.id);

    const response = createApiResponse(
      "success",
      null,
      "Organization deleted successfully"
    );
    res.json(response);
  }),
};
