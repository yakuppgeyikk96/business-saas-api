import { asyncHandler } from "@/middleware/errorHandler";
import { organizationMemberService } from "@/services/organizationMember.service";
import AuthRequest from "@/types/auth/AuthRequest";
import createApiResponse from "@/utils/createApiResponse";
import { Response } from "express";

export const organizationMemberController = {
  addMember: asyncHandler(async (req: AuthRequest, res: Response) => {
    const member = await organizationMemberService.addMember({
      ...req.body,
      invitedBy: req.user!.id,
    });

    const response = createApiResponse(
      "success",
      member,
      "Member added successfully"
    );
    res.status(201).json(response);
  }),

  getOrganizationMembers: asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { page = 1, limit = 10, sortField, sortOrder } = req.query;
      const organizationId = req.params.organizationId;

      const { members, total } =
        await organizationMemberService.getOrganizationMembers(organizationId, {
          page: Number(page),
          limit: Number(limit),
          sortField: sortField as string,
          sortOrder: sortOrder as "asc" | "desc",
        });

      const response = createApiResponse(
        "success",
        members,
        "Members retrieved successfully",
        {
          page: Number(page),
          limit: Number(limit),
          total,
        }
      );
      res.json(response);
    }
  ),

  getMember: asyncHandler(async (req: AuthRequest, res: Response) => {
    const member = await organizationMemberService.getMember(req.params.id);

    const response = createApiResponse(
      "success",
      member,
      "Member retrieved successfully"
    );
    res.json(response);
  }),

  updateMember: asyncHandler(async (req: AuthRequest, res: Response) => {
    const member = await organizationMemberService.updateMember(
      req.params.id,
      req.body
    );

    const response = createApiResponse(
      "success",
      member,
      "Member updated successfully"
    );
    res.json(response);
  }),

  removeMember: asyncHandler(async (req: AuthRequest, res: Response) => {
    await organizationMemberService.removeMember(req.params.id);

    const response = createApiResponse(
      "success",
      null,
      "Member removed successfully"
    );
    res.json(response);
  }),
};
