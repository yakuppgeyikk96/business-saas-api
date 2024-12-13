import { NotFoundError, BadRequestError } from "../types/error";
import { CategoryRepository } from "../repositories/category.repository";
import ICategory from "@/types/category/ICategory";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(name: string): Promise<ICategory> {
    const existingCategory = await this.categoryRepository.findByName(name);
    if (existingCategory) {
      throw new BadRequestError("Category with this name already exists");
    }

    return this.categoryRepository.create({ name });
  }

  async getAllCategories(): Promise<ICategory[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  }

  async updateCategory(id: string, name: string): Promise<ICategory> {
    await this.getCategoryById(id);

    const existingCategory = await this.categoryRepository.findByName(name);
    if (existingCategory && existingCategory.id !== id) {
      throw new BadRequestError("Category with this name already exists");
    }

    const updatedCategory = await this.categoryRepository.update(id, { name });
    if (!updatedCategory) {
      throw new NotFoundError("Category not found");
    }
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const deletedCategory = await this.categoryRepository.delete(id);
    if (!deletedCategory) {
      throw new NotFoundError("Category not found");
    }
  }

  // private async checkCategoryUsage(id: string): Promise<void> {

  // }
}

export const categoryService = new CategoryService();
