import { Document } from "mongoose";

export default interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
