import { NextFunction, Response } from "express";
import AuthRequest from "@/types/auth/AuthRequest";
import { UnauthorizedError } from "@/types/error";
import { OrganizationPermission } from "@/types/organization/Permission";
import { organizationMemberService } from "@/services/organizationMember.service";

export const hasPermission = (permission: OrganizationPermission) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    console.log(req.params);
    try {
      const organizationId =
        req.body.organization ||
        req.query.organizationId ||
        req.params.organizationId ||
        req.params.id;

      if (!organizationId) {
        throw new Error("Organization ID is required");
      }

      const member = await organizationMemberService.findByOrganizationAndUser(
        organizationId,
        req.user!.id
      );

      if (!member) {
        throw new UnauthorizedError(
          "You are not a member of this organization"
        );
      }

      if (!member.permissions.includes(permission)) {
        throw new UnauthorizedError(`You don't have ${permission} permission`);
      }

      req.organizationMember = member;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const hasAnyPermission = (permissions: OrganizationPermission[]) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const organizationId =
        req.body.organization ||
        req.query.organizationId ||
        req.params.organizationId;

      if (!organizationId) {
        throw new Error("Organization ID is required");
      }

      const member = await organizationMemberService.findByOrganizationAndUser(
        organizationId,
        req.user!.id
      );

      if (!member) {
        throw new UnauthorizedError(
          "You are not a member of this organization"
        );
      }

      const hasPermission = permissions.some((permission) =>
        member.permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new UnauthorizedError("You don't have required permissions");
      }

      req.organizationMember = member;

      next();
    } catch (error) {
      next(error);
    }
  };
};
