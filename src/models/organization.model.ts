import IOrganization from "@/types/organization/IOrganization";
import { model, Schema } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrganizationModel = model<IOrganization>(
  "Organization",
  organizationSchema
);
