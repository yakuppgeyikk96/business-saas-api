import { OrganizationPermission } from "@/types/organization/Permission";
import { OrganizationRole } from "@/types/organization/Role";
import { Document, model, Schema, Types } from "mongoose";

export interface IOrganizationMember extends Document {
  organization: Types.ObjectId;
  user: Types.ObjectId;
  role: OrganizationRole;
  permissions: OrganizationPermission[];
  joinedAt: Date;
  invitedBy?: Types.ObjectId;
}

const organizationMemberSchema = new Schema(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(OrganizationRole),
      required: true,
    },
    permissions: [
      {
        type: String,
        enum: Object.values(OrganizationPermission),
      },
    ],
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * A user can only be a member of an organization once.
 */
organizationMemberSchema.index({ organization: 1, user: 1 }, { unique: true });

export const OrganizationMemberModel = model<IOrganizationMember>(
  "OrganizationMember",
  organizationMemberSchema
);
