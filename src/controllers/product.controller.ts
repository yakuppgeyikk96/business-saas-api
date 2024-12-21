import { asyncHandler } from "@/middleware/errorHandler";
import { productService } from "@/services/product.service";
import AuthRequest from "@/types/auth/AuthRequest";
import createApiResponse from "@/utils/createApiResponse";
import { Response } from "express";

export const productController = {
  createProduct: asyncHandler(async (req: AuthRequest, res: Response) => {
    const bodyData = req.body;
    const userId = req.user!.id;

    const product = await productService.createProduct(bodyData, userId);
    const response = createApiResponse(
      "success",
      product,
      "Product created successfully"
    );
    res.status(201).json(response);
  }),

  getProduct: asyncHandler(async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const userId = req.user!.id;

    const product = await productService.getProduct(productId, userId);

    const response = createApiResponse(
      "success",
      product,
      "Product retrieved successfully"
    );
    res.json(response);
  }),

  getAllProducts: asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortField,
      sortOrder,
      category,
      minPrice,
      maxPrice,
      organizationId,
    } = req.query;

    const userId = req.user!.id;

    const { products, total } = await productService.getAllProducts({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      sortField: sortField as string,
      sortOrder: sortOrder as "asc" | "desc",
      category: category as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      organizationId: organizationId as string,
      userId,
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

  updateProduct: asyncHandler(async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const data = req.body;
    const userId = req.user!.id;

    const product = await productService.updateProduct(productId, data, userId);
    res.json(
      createApiResponse("success", product, "Product updated successfully")
    );
  }),

  deleteProduct: asyncHandler(async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const userId = req.user!.id;

    await productService.deleteProduct(productId, userId);

    res.json(
      createApiResponse("success", null, "Product deleted successfully")
    );
  }),

  updateStock: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { quantity } = req.body;

    const productId = req.params.id;
    const userId = req.user!.id;

    const product = await productService.updateStock(
      productId,
      quantity,
      userId
    );

    res.json(
      createApiResponse(
        "success",
        product,
        "Product stock updated successfully"
      )
    );
  }),
};
