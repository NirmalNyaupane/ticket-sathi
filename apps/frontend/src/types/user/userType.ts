import { UserRoleEnum } from "@/constants/enum";
import { ApiSucessResponse } from "../generics/ApiGenericsType";

interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  role: UserRoleEnum;
  address: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  is_organizer_registered:boolean
}
type UserResponse = ApiSucessResponse<User>;

export type {User, UserResponse}