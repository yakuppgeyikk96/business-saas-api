import { z } from "zod";
import { createProductSchema } from "./createProduct.schema";
import { updateProductSchema } from "./updateProduct.schema";

export type CreateProductInput = z.TypeOf<typeof createProductSchema>["body"];
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>["body"];
