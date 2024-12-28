import { productController } from "@/controllers/product.controller";
import { auth } from "@/middleware/auth";
import { hasPermission } from "@/middleware/permission";
import { validateResource } from "@/middleware/validateResource";
import { createProductSchema } from "@/schemas/product/createProduct.schema";
import { updateProductSchema } from "@/schemas/product/updateProduct.schema";
import { OrganizationPermission } from "@/types/organization/Permission";
import { Router } from "express";

const router = Router();

router.use(auth);

router.get(
  "/",
  hasPermission(OrganizationPermission.VIEW_PRODUCTS),
  productController.getAllProducts
);

router.get(
  "/:id",
  hasPermission(OrganizationPermission.VIEW_PRODUCTS),
  productController.getProduct
);

router.post(
  "/",
  hasPermission(OrganizationPermission.CREATE_PRODUCT),
  validateResource(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  hasPermission(OrganizationPermission.UPDATE_PRODUCT),
  validateResource(updateProductSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  hasPermission(OrganizationPermission.DELETE_PRODUCT),
  productController.deleteProduct
);

router.patch(
  "/:id/stock",
  hasPermission(OrganizationPermission.DELETE_PRODUCT),
  productController.updateStock
);

export default router;
