import ICategory from "@/types/category/ICategory";
import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model<ICategory>("Category", categorySchema);
