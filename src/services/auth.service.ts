import { UserModel } from "@/models/user.model";
import { LoginInput } from "@/schemas/auth/login.schema";
import { RegisterInput } from "@/schemas/auth/register.schema";
import { BadRequestError, UnauthorizedError } from "@/types/error";
import { userRepository } from "@/repositories/user.repository";
import AuthResponse from "@/types/auth/AuthResponse";
import jwt from "jsonwebtoken";
import { UserType } from "@/types/user/UserType";

class AuthService {
  private generateToken(userId: string, userType: UserType): string {
    const generatedToken = jwt.sign(
      { id: userId, userType },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return generatedToken;
  }

  private formatUserResponse(user: any): AuthResponse["user"] {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
    };
  }

  async register(data: RegisterInput): Promise<AuthResponse> {
    /**
     * Check if the email is already in use
     */
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    /**
     * Create a new user
     */
    const newUser = await userRepository.create({ ...data });

    /**
     * Generate a token
     */
    const token = this.generateToken(newUser.id, newUser.userType);

    return {
      user: this.formatUserResponse(newUser),
      token,
    };
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    /**
     * Check if the user exists
     */
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    /**
     * Check if the password is correct
     */
    const isPasswordCorrect = await user.comparePassword(data.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid credentials");
    }

    /**
     * Access control according to platform
     */
    if (
      data.websiteType === "ecommerce" &&
      user.userType !== UserType.INDIVIDUAL
    ) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (
      data.websiteType === "business" &&
      user.userType !== UserType.BUSINESS
    ) {
      throw new UnauthorizedError("Invalid credentials");
    }

    /**
     * Generate a token
     */
    const token = this.generateToken(user.id, user.userType);

    return {
      user: this.formatUserResponse(user),
      token,
    };
  }

  async getUserById(userId: string): Promise<AuthResponse["user"]> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return this.formatUserResponse(user);
  }
}

export const authService = new AuthService();
