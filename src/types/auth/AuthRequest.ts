import { IOrganizationMember } from "@/models/organizationMember.model";
import { Request } from "express";
import { UserType } from "../user/UserType";

export default interface AuthRequest extends Request {
  user?: {
    id: string;
    userType: UserType;
  };
  organizationMember?: IOrganizationMember;
}
