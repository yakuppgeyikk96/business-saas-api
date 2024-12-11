import { asyncHandler } from "@/middleware/errorHandler";
import { productService } from "@/services/product.service";
import createApiResponse from "@/utils/createApiResponse";
import { Request, Response } from "express";

export const productController = {
  createProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    const response = createApiResponse(
      "success",
      product,
      "Product created successfully"
    );
    res.status(201).json(response);
  }),

  getProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.getProduct(req.params.id);
    const response = createApiResponse(
      "success",
      product,
      "Product retrieved successfully"
    );
    res.json(response);
  }),

  getAllProducts: asyncHandler(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortField,
      sortOrder,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    const { products, total } = await productService.getAllProducts({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      sortField: sortField as string,
      sortOrder: sortOrder as "asc" | "desc",
      category: category as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    const response = createApiResponse(
      "success",
      products,
      "Products retrieved successfully",
      {
        page: Number(page),
        limit: Number(limit),
        total,
      }
    );
    res.json(response);
  }),

  updateProduct: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(
      createApiResponse("success", product, "Product updated successfully")
    );
  }),

  deleteProduct: asyncHandler(async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id);
    res.json(
      createApiResponse("success", null, "Product deleted successfully")
    );
  }),

  updateStock: asyncHandler(async (req: Request, res: Response) => {
    const { quantity } = req.body;
    const product = await productService.updateStock(req.params.id, quantity);
    res.json(
      createApiResponse(
        "success",
        product,
        "Product stock updated successfully"
      )
    );
  }),
};
