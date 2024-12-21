import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2, "Title must be at least 2 characters"),
    price: z
      .number({
        required_error: "Price is required",
      })
      .min(0, "Price must be greater than 0"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(10, "Description must be at least 10 characters"),
    category: z.string({
      required_error: "Category is required",
    }),
    stock: z
      .number({
        required_error: "Stock is required",
      })
      .min(0, "Stock must be greater than or equal to 0"),
    organization: z.string({
      required_error: "User id is required",
    }),
  }),
});
