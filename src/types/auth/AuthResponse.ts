import { UserType } from "../user/UserType";

export default interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    userType: UserType;
  };
  token: string;
}
