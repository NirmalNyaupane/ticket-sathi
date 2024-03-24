import { registerValidation } from "@/lib/formvalidation/authvalidation";
import {
  ApiFailureError,
  ApiSucessResponse,
} from "../generics/ApiGenericsType";
import { z } from "zod";
import { UserRole } from "@/constants/enum";
import organizerRegisterFormValidation from "@/lib/formvalidation/organizerRegister";

export interface UserResponse {
  id: string;
  avatar: string;
  is_verified: boolean;
  is_organizer_registered: boolean;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}

export type UserRegisterPayload = Omit<
  z.infer<typeof registerValidation>,
  "confirmPassword"
>;

export type AuthRegisterResponse = ApiSucessResponse<UserResponse>;

export type AuthRegisterErrorResponse = ApiFailureError<string>;

export interface LoginSucessResponse {
  id: string;
  accessToken: string;
  role: UserRole;
  isVerified: boolean;
}

export type LoginFailure = ApiFailureError<[]>;


/************** Register organizer ***************************/
export type OrganizerRegisterFormData = z.infer<typeof organizerRegisterFormValidation>

