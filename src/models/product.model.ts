import { Document, Schema, model, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  category: Types.ObjectId;
  stock: number;
  organization: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<IProduct>("Product", productSchema);
