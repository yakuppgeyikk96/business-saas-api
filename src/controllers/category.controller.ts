import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { asyncHandler } from "../middleware/errorHandler";
import createApiResponse from "@/utils/createApiResponse";

export const categoryController = {
  createCategory: asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);

    const response = createApiResponse(
      "success",
      category,
      "Category created successfully"
    );

    res.status(201).json(response);
  }),

  getAllCategories: asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    const response = createApiResponse(
      "success",
      categories,
      "Categories retrieved successfully"
    );

    res.json(response);
  }),

  getCategory: asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.getCategoryById(req.params.id);

    const response = createApiResponse(
      "success",
      category,
      "Category retrieved successfully"
    );

    res.json(response);
  }),

  updateCategory: asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await categoryService.updateCategory(req.params.id, name);

    const response = createApiResponse(
      "success",
      category,
      "Category updated successfully"
    );

    res.json(response);
  }),

  deleteCategory: asyncHandler(async (req: Request, res: Response) => {
    await categoryService.deleteCategory(req.params.id);

    const response = createApiResponse(
      "success",
      null,
      "Category deleted successfully"
    );

    res.json(response);
  }),
};
