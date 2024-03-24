import { UserRole } from "@/constants/enum";
import { ApiSucessResponse } from "../generics/ApiGenericsType";

interface Media {
  name: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  threads?: string;
}
interface OrganizerDetails {
  abnAcn: string
  address: string
  bio: string
  isGstRegister: boolean
  organizerName: string
  socialLinks: SocialLinks
}
interface User {
  role: UserRole
  profile?: Media
  phone: string
  organizerDetails?: OrganizerDetails
  isVerified: boolean
  fullName: string
  email: string
  authType: string
  OrganizerDocuments?: {
    logo: Media
    documents: Media
  }
}
type UserResponse = ApiSucessResponse<User>;

export type { User, UserResponse }