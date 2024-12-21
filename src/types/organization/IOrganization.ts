import { Document, Schema } from "mongoose";

export default interface IOrganization extends Document {
  name: string;
  description?: string;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
