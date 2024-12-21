import { productController } from "@/controllers/product.controller";
import { auth } from "@/middleware/auth";
import { validateResource } from "@/middleware/validateResource";
import { createProductSchema } from "@/schemas/product/createProduct.schema";
import { updateProductSchema } from "@/schemas/product/updateProduct.schema";
import { Router } from "express";

const router = Router();

router.use(auth);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.post(
  "/",
  validateResource(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  validateResource(updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

router.patch("/:id/stock", productController.updateStock);

export default router;
