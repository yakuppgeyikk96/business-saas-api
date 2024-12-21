import { z } from "zod";

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    price: z.number().min(0).optional(),
    description: z.string().min(10).optional(),
    category: z.string().optional(),
    stock: z.number().min(0).optional(),
    organization: z.string().optional(),
  }),
});
