import { Router } from "express";
import { createCategorySchema, updateCategorySchema } from "@/schemas/category";
import { validateResource } from "@/middleware/validateResource";
import { categoryController } from "@/controllers/category.controller";

const router = Router();

router.post(
  "/",
  validateResource(createCategorySchema),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategory);

router.patch(
  "/:id",
  validateResource(updateCategorySchema),
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deleteCategory);

export default router;
