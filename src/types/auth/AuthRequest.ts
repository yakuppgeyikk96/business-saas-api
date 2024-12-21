import { IOrganizationMember } from "@/models/organizationMember.model";
import { Request } from "express";

export default interface AuthRequest extends Request {
  user?: {
    id: string;
  };
  organizationMember?: IOrganizationMember;
}
