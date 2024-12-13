import { CategoryModel } from "@/models/category.model";
import ICategory from "@/types/category/ICategory";

export class CategoryRepository {
  async create(data: Pick<ICategory, "name">): Promise<ICategory> {
    return CategoryModel.create(data);
  }

  async findAll(): Promise<ICategory[]> {
    return CategoryModel.find().sort({ name: "asc" });
  }

  async findById(id: string): Promise<ICategory | null> {
    return CategoryModel.findById(id);
  }

  async findByName(name: string): Promise<ICategory | null> {
    return CategoryModel.findOne({ name });
  }

  async update(
    id: string,
    data: Partial<Pick<ICategory, "name">>
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICategory | null> {
    return CategoryModel.findByIdAndDelete(id);
  }
}
