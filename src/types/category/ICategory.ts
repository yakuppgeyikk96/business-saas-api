import { Document } from "mongoose";

export default interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
