import { UserModel } from "@/models/user.model";
import IUser from "@/types/user/IUser";

export class UserRepository {
  async create(
    data: Pick<IUser, "email" | "password" | "name">
  ): Promise<IUser> {
    return UserModel.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("-password");
  }
}

export const userRepository = new UserRepository();
