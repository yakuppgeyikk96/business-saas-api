import { Document } from "mongoose";
import { UserType } from "./UserType";

export default interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  userType: UserType;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
