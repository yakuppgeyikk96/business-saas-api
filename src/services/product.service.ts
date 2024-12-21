import { IProduct } from "@/models/product.model";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductInput, UpdateProductInput } from "@/schemas/product";
import { NotFoundError, UnauthorizedError } from "@/types/error";
import { OrganizationService } from "./organization.service";

export class ProductService {
  private static instance: ProductService;
  private productRepository: ProductRepository;
  private organizationService: OrganizationService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.organizationService = OrganizationService.getInstance();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async createProduct(
    data: CreateProductInput,
    userId: string
  ): Promise<IProduct> {
    /**
     * Check if the user has access to the organization
     */
    await this.organizationService.getOrganization(data.organization, userId);

    /**
     * Create the product
     */
    return this.productRepository.create(data);
  }

  async getProduct(id: string, userId: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    /**
     * Check if the user has access to the product
     */
    await this.organizationService.getOrganization(
      product.organization._id.toString(),
      userId
    );

    return product;
  }

  async getAllProducts(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    organizationId: string;
    userId: string;
  }): Promise<{
    products: IProduct[];
    total: number;
  }> {
    const {
      page = 1,
      limit = 10,
      search,
      sortField,
      sortOrder = "asc",
      category,
      minPrice,
      maxPrice,
      organizationId,
      userId,
    } = options;

    /**
     * If organizationId is provided, check if the user has access to the organization
     */
    await this.organizationService.getOrganization(organizationId, userId);

    const query: any = {
      organization: organizationId,
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = minPrice;
      }
      if (maxPrice) {
        query.price.$lte = maxPrice;
      }
    }

    const total = await this.productRepository.count(query);

    const products = await this.productRepository.findAll({
      query,
      sort: sortField ? { [sortField]: sortOrder } : undefined,
      skip: (page - 1) * limit,
      limit,
    });

    return { products, total };
  }

  async updateProduct(
    id: string,
    data: UpdateProductInput,
    userId: string
  ): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    /**
     * Check if the user has access to the organization of the product
     */
    await this.organizationService.getOrganization(
      product.organization._id.toString(),
      userId
    );

    const updatedProduct = await this.productRepository.update(id, data);

    if (!updatedProduct) {
      throw new Error("Failed to update product");
    }

    return updatedProduct;
  }

  async deleteProduct(id: string, userId: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    /**
     * Check if the user has access to the organization of the product
     */
    await this.organizationService.getOrganization(
      product.organization._id.toString(),
      userId
    );

    const deletedProduct = await this.productRepository.delete(id);

    if (!deletedProduct) {
      throw new Error("Failed to delete product");
    }

    return deletedProduct;
  }

  async updateStock(
    id: string,
    quantity: number,
    userId: string
  ): Promise<IProduct> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError("Product not found or insufficient stock");
    }

    /**
     * Check if the user has access to the organization of the product
     */
    await this.organizationService.getOrganization(
      existingProduct.organization.toString(),
      userId
    );

    const updatedProduct = await this.productRepository.updateStock(
      id,
      quantity
    );

    if (!updatedProduct) {
      throw new Error("Failed to update stock");
    }

    return updatedProduct;
  }
}

export const productService = ProductService.getInstance();
