import { IProduct, ProductModel } from "@/models/product.model";
import { CreateProductInput, UpdateProductInput } from "@/schemas/product";
import { SortOrder } from "mongoose";

interface FindAllOptions {
  query: any;
  sort?: { [key: string]: "asc" | "desc" };
  skip?: number;
  limit?: number;
}

export class ProductRepository {
  async create(data: CreateProductInput): Promise<IProduct> {
    return ProductModel.create(data);
  }

  async update(id: string, data: UpdateProductInput): Promise<IProduct | null> {
    return ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async findById(id: string): Promise<IProduct | null> {
    return ProductModel.findById(id).populate("category");
  }

  async delete(id: string): Promise<IProduct | null> {
    return ProductModel.findByIdAndDelete(id);
  }

  async updateStock(id: string, quantity: number): Promise<IProduct | null> {
    return ProductModel.findOneAndUpdate(
      { _id: id, stock: { $gte: -quantity } },
      { $inc: { stock: quantity } },
      { new: true }
    );
  }

  async findAll(options: FindAllOptions): Promise<IProduct[]> {
    const { query, sort, skip, limit } = options;
    let findQuery = ProductModel.find(query).populate("category");

    if (sort) {
      const sortCriteria: { [key: string]: SortOrder } = {};
      Object.entries(sort).forEach(([key, value]) => {
        sortCriteria[key] = value === "asc" ? 1 : -1;
      });

      findQuery = findQuery.sort(sortCriteria);
    }

    if (skip !== undefined) findQuery = findQuery.skip(skip);
    if (limit !== undefined) findQuery = findQuery.limit(limit);

    return findQuery.exec();
  }

  async count(query: any = {}): Promise<number> {
    return ProductModel.countDocuments(query);
  }
}
