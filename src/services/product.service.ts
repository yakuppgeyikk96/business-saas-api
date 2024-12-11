import { IProduct } from "@/models/product.model";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductInput, UpdateProductInput } from "@/schemas/product";
import { NotFoundError } from "@/types/error";

export class ProductService {
  private static instance: ProductService;
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async createProduct(data: CreateProductInput): Promise<IProduct> {
    return this.productRepository.create(data);
  }

  async getProduct(id: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
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
    } = options;

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
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

  async updateProduct(id: string, data: UpdateProductInput): Promise<IProduct> {
    const product = await this.productRepository.update(id, data);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }

  async deleteProduct(id: string): Promise<IProduct> {
    const product = await this.productRepository.delete(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }

  async updateStock(id: string, quantity: number): Promise<IProduct> {
    const updatedProduct = await this.productRepository.updateStock(
      id,
      quantity
    );
    if (!updatedProduct) {
      throw new Error("Product not found or insufficient stock");
    }
    return updatedProduct;
  }
}

export const productService = ProductService.getInstance();
