import { ApiSucessResponse } from "../generics/ApiGenericsType";
import { AuthType, OrganizerStatus, UserRole } from "@/__generated__/graphql";

type User = {
  id: string,
  createdAt: string,
  fullName: string,
  email: string,
  phone: string,
  role: UserRole,
  authType: AuthType,
  isVerified: boolean,
  organizerDetails?: {
    __typename?: 'OrganizerDetails',
    id: string,
    createdAt: string,
    organizerName: string,
    address: string,
    bio?: string | null,
    website?: string | null,
    status: OrganizerStatus,
    isGstRegister: boolean,
    abnAcn: string,
    socialLinks?: {
      __typename?: 'SocialLinksResponse',
      facebook?: string | null,
      instagram?: string | null,

      twitter?: string | null,
      threads?: string | null
    } | null
  } | null,
  organizerDocuments?: {
    __typename?: 'OrganizerDocuments',
    id: string,
    documents: Array<{ __typename?: 'Media', name?: string | null }>,
    logo: { __typename?: 'Media', name?: string | null }
  } | null,
  profile: { __typename?: 'Media', name?: string | null }
}
type UserResponse = ApiSucessResponse<User>;

export type { User, UserResponse }
