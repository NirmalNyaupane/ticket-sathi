import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  accessToken: Scalars['String']['output'];
};

export enum AuthType {
  Apple = 'APPLE',
  Google = 'GOOGLE',
  Traditional = 'TRADITIONAL'
}

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CommonQuery = {
  page?: Scalars['Int']['input'];
  pageLimit?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type CreateCategoryValidation = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEventValidator = {
  categoryId: Scalars['String']['input'];
  cover: Scalars['String']['input'];
  description: Scalars['String']['input'];
  eventEndDate: Scalars['String']['input'];
  eventStartDate: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  type: EventType;
  venue: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  cover: Media;
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  eventEndDate: Scalars['DateTimeISO']['output'];
  eventStartDate: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  images: Array<Media>;
  name: Scalars['String']['output'];
  rejectionCount: Scalars['Int']['output'];
  status: EventStatus;
  type: EventType;
  venue: Scalars['String']['output'];
};

/** Defines status of event */
export enum EventStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Defines type of enum */
export enum EventType {
  Concert = 'CONCERT',
  Theater = 'THEATER',
  Virtual = 'VIRTUAL'
}

export type ForgotPasswordRequestValidator = {
  email: Scalars['String']['input'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  accessToken: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: UserRole;
  status: Scalars['String']['output'];
};

export type LoginValidator = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  mediaType?: Maybe<MediaType>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type MediaInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<MediaType>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type MediaSchema = {
  __typename?: 'MediaSchema';
  id: Scalars['String']['output'];
  mediaType?: Maybe<MediaType>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum MediaType {
  EventCover = 'EVENT_COVER',
  EventImage = 'EVENT_IMAGE',
  OrganizerDocument = 'ORGANIZER_DOCUMENT',
  UserProfile = 'USER_PROFILE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Role: Organizer */
  createCategory: CommonResponse;
  createEvent: CommonResponse;
  deleteCategoryPermanent: CommonResponse;
  forgotPasswordRequest: CommonResponse;
  getAccessToken: AccessTokenResponse;
  login: LoginUserResponse;
  moveCategoryTrash: CommonResponse;
  recoverFromTrash: CommonResponse;
  registerUser: RegisterUserResponse;
  resetForgotPassword: CommonResponse;
  updateCategory: CommonResponse;
  updateProfilePic: CommonResponse;
  updateUser: CommonResponse;
  uploadMedia: MediaSchema;
  verifyOtp: CommonResponse;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryValidation;
};


export type MutationCreateEventArgs = {
  data: CreateEventValidator;
};


export type MutationDeleteCategoryPermanentArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationForgotPasswordRequestArgs = {
  data: ForgotPasswordRequestValidator;
};


export type MutationGetAccessTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginValidator;
};


export type MutationMoveCategoryTrashArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationRecoverFromTrashArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  data: RegisterUserSchema;
};


export type MutationResetForgotPasswordArgs = {
  data: ResetForgotPasswordValidator;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String']['input'];
  data: UpdateCategoryValidation;
};


export type MutationUpdateProfilePicArgs = {
  data: UpdateProfilePic;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserValidation;
};


export type MutationUploadMediaArgs = {
  file: Scalars['Upload']['input'];
  mediaType: MediaType;
};


export type MutationVerifyOtpArgs = {
  data: OtpVerifyValidator;
};

export type OrganizerDetails = {
  __typename?: 'OrganizerDetails';
  abnAcn: Scalars['String']['output'];
  address: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  isGstRegister: Scalars['Boolean']['output'];
  organizerName: Scalars['String']['output'];
  socialLinks?: Maybe<SocialLinksResponse>;
  status: OrganizerStatus;
  website?: Maybe<Scalars['String']['output']>;
};

export type OrganizerDocuments = {
  __typename?: 'OrganizerDocuments';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  documents?: Maybe<Array<Media>>;
  id: Scalars['String']['output'];
  logo?: Maybe<Media>;
};

export enum OrganizerStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type OtpVerifyValidator = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type PaginatedEventObject = {
  __typename?: 'PaginatedEventObject';
  data: Array<Event>;
  meta: Pagination;
};

export type PaginatedOrganizerCategory = {
  __typename?: 'PaginatedOrganizerCategory';
  data: Array<Category>;
  meta: Pagination;
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Int']['output'];
  lastPage: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser: UserResponse;
  getMyCategory: PaginatedOrganizerCategory;
  getMyEvents: PaginatedEventObject;
  getMyTrashedCategory: PaginatedOrganizerCategory;
};


export type QueryGetMyCategoryArgs = {
  query: CommonQuery;
};


export type QueryGetMyEventsArgs = {
  query: CommonQuery;
};


export type QueryGetMyTrashedCategoryArgs = {
  query: CommonQuery;
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
  user: User;
};

export type RegisterUserSchema = {
  abnAcn?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<Array<MediaInput>>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  isGstRegister?: InputMaybe<Scalars['Boolean']['input']>;
  organizerName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: UserRole;
};

export type ResetForgotPasswordValidator = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SocialLinksResponse = {
  __typename?: 'SocialLinksResponse';
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  threads?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type UpdateCategoryValidation = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfilePic = {
  mediaId: Scalars['String']['input'];
};

export type UpdateUserValidation = {
  address?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  role: UserRole;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  address?: Maybe<Scalars['String']['output']>;
  authType: AuthType;
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  organizerDetails?: Maybe<OrganizerDetails>;
  organizerDocuments?: Maybe<OrganizerDocuments>;
  phone: Scalars['String']['output'];
  profile?: Maybe<Media>;
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Organizer = 'ORGANIZER',
  User = 'USER'
}

export type RegisterUserMutationVariables = Exact<{
  data: RegisterUserSchema;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserResponse', message: string } };

export type VerifyOtpMutationVariables = Exact<{
  data: OtpVerifyValidator;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'CommonResponse', message: string } };

export type LoginMutationVariables = Exact<{
  data: LoginValidator;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginUserResponse', id: string, accessToken: string, refreshToken: string, role: UserRole, isVerified: boolean } };

export type ForgotPasswordRequestMutationVariables = Exact<{
  data: ForgotPasswordRequestValidator;
}>;


export type ForgotPasswordRequestMutation = { __typename?: 'Mutation', forgotPasswordRequest: { __typename?: 'CommonResponse', message: string } };

export type ResetForgotPasswordMutationVariables = Exact<{
  data: ResetForgotPasswordValidator;
}>;


export type ResetForgotPasswordMutation = { __typename?: 'Mutation', resetForgotPassword: { __typename?: 'CommonResponse', message: string } };

export type UploadMediaMutationVariables = Exact<{
  mediaType: MediaType;
  file: Scalars['Upload']['input'];
}>;


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'MediaSchema', id: string, name: string, mimeType?: string | null, mediaType?: MediaType | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserValidation;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'CommonResponse', message: string, status: string } };

export type UpdateProfilePicMutationVariables = Exact<{
  data: UpdateProfilePic;
}>;


export type UpdateProfilePicMutation = { __typename?: 'Mutation', updateProfilePic: { __typename?: 'CommonResponse', message: string, status: string } };

export type CreateCategoryMutationVariables = Exact<{
  data: CreateCategoryValidation;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CommonResponse', message: string, status: string } };

export type UpdateCategoryMutationVariables = Exact<{
  data: UpdateCategoryValidation;
  categoryId: Scalars['String']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CommonResponse', message: string } };

export type MovedcategoryMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type MovedcategoryMutation = { __typename?: 'Mutation', moveCategoryTrash: { __typename?: 'CommonResponse', message: string } };

export type RecoverFromTrashMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type RecoverFromTrashMutation = { __typename?: 'Mutation', recoverFromTrash: { __typename?: 'CommonResponse', message: string, status: string } };

export type DeleteCategoryPermanentMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type DeleteCategoryPermanentMutation = { __typename?: 'Mutation', deleteCategoryPermanent: { __typename?: 'CommonResponse', message: string, status: string } };

export type CreateEventMutationVariables = Exact<{
  data: CreateEventValidator;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'CommonResponse', message: string, status: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'UserResponse', id: string, createdAt: any, fullName: string, email: string, phone: string, role: UserRole, authType: AuthType, isVerified: boolean, address?: string | null, organizerDetails?: { __typename?: 'OrganizerDetails', id: string, createdAt: any, organizerName: string, address: string, bio?: string | null, website?: string | null, status: OrganizerStatus, isGstRegister: boolean, abnAcn: string, socialLinks?: { __typename?: 'SocialLinksResponse', facebook?: string | null, instagram?: string | null, twitter?: string | null, threads?: string | null } | null } | null, organizerDocuments?: { __typename?: 'OrganizerDocuments', id: string, documents?: Array<{ __typename?: 'Media', name?: string | null }> | null, logo?: { __typename?: 'Media', name?: string | null } | null } | null, profile?: { __typename?: 'Media', name?: string | null } | null } };

export type GetMyCategoryQueryVariables = Exact<{
  query: CommonQuery;
}>;


export type GetMyCategoryQuery = { __typename?: 'Query', getMyCategory: { __typename?: 'PaginatedOrganizerCategory', data: Array<{ __typename?: 'Category', description: string, id: string, name: string }>, meta: { __typename?: 'Pagination', currentPage: number, lastPage: number, prevPage?: number | null, totalCount: number, nextPage?: number | null } } };

export type GetMyTrashedCategoryQueryVariables = Exact<{
  query: CommonQuery;
}>;


export type GetMyTrashedCategoryQuery = { __typename?: 'Query', getMyTrashedCategory: { __typename?: 'PaginatedOrganizerCategory', data: Array<{ __typename?: 'Category', description: string, id: string, name: string, deletedAt?: any | null }>, meta: { __typename?: 'Pagination', currentPage: number, lastPage: number, nextPage?: number | null, prevPage?: number | null, totalCount: number } } };

export type GetMyEventsQueryVariables = Exact<{
  query: CommonQuery;
}>;


export type GetMyEventsQuery = { __typename?: 'Query', getMyEvents: { __typename?: 'PaginatedEventObject', data: Array<{ __typename?: 'Event', eventEndDate: any, description: string, eventStartDate: any, name: string, rejectionCount: number, type: EventType, status: EventStatus, venue: string, id: string, createdAt: any, cover: { __typename?: 'Media', name?: string | null }, images: Array<{ __typename?: 'Media', name?: string | null }> }>, meta: { __typename?: 'Pagination', currentPage: number, prevPage?: number | null, nextPage?: number | null, lastPage: number, totalCount: number } } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($data: RegisterUserSchema!) {
  registerUser(data: $data) {
    message
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($data: OtpVerifyValidator!) {
  verifyOtp(data: $data) {
    message
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginValidator!) {
  login(data: $data) {
    id
    accessToken
    refreshToken
    role
    isVerified
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotPasswordRequestDocument = gql`
    mutation ForgotPasswordRequest($data: ForgotPasswordRequestValidator!) {
  forgotPasswordRequest(data: $data) {
    message
  }
}
    `;
export type ForgotPasswordRequestMutationFn = Apollo.MutationFunction<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>;

/**
 * __useForgotPasswordRequestMutation__
 *
 * To run a mutation, you first call `useForgotPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordRequestMutation, { data, loading, error }] = useForgotPasswordRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordRequestMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>(ForgotPasswordRequestDocument, options);
      }
export type ForgotPasswordRequestMutationHookResult = ReturnType<typeof useForgotPasswordRequestMutation>;
export type ForgotPasswordRequestMutationResult = Apollo.MutationResult<ForgotPasswordRequestMutation>;
export type ForgotPasswordRequestMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordRequestMutation, ForgotPasswordRequestMutationVariables>;
export const ResetForgotPasswordDocument = gql`
    mutation ResetForgotPassword($data: ResetForgotPasswordValidator!) {
  resetForgotPassword(data: $data) {
    message
  }
}
    `;
export type ResetForgotPasswordMutationFn = Apollo.MutationFunction<ResetForgotPasswordMutation, ResetForgotPasswordMutationVariables>;

/**
 * __useResetForgotPasswordMutation__
 *
 * To run a mutation, you first call `useResetForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetForgotPasswordMutation, { data, loading, error }] = useResetForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetForgotPasswordMutation, ResetForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetForgotPasswordMutation, ResetForgotPasswordMutationVariables>(ResetForgotPasswordDocument, options);
      }
export type ResetForgotPasswordMutationHookResult = ReturnType<typeof useResetForgotPasswordMutation>;
export type ResetForgotPasswordMutationResult = Apollo.MutationResult<ResetForgotPasswordMutation>;
export type ResetForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ResetForgotPasswordMutation, ResetForgotPasswordMutationVariables>;
export const UploadMediaDocument = gql`
    mutation UploadMedia($mediaType: MediaType!, $file: Upload!) {
  uploadMedia(mediaType: $mediaType, file: $file) {
    id
    name
    mimeType
    mediaType
  }
}
    `;
export type UploadMediaMutationFn = Apollo.MutationFunction<UploadMediaMutation, UploadMediaMutationVariables>;

/**
 * __useUploadMediaMutation__
 *
 * To run a mutation, you first call `useUploadMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMediaMutation, { data, loading, error }] = useUploadMediaMutation({
 *   variables: {
 *      mediaType: // value for 'mediaType'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMediaMutation(baseOptions?: Apollo.MutationHookOptions<UploadMediaMutation, UploadMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMediaMutation, UploadMediaMutationVariables>(UploadMediaDocument, options);
      }
export type UploadMediaMutationHookResult = ReturnType<typeof useUploadMediaMutation>;
export type UploadMediaMutationResult = Apollo.MutationResult<UploadMediaMutation>;
export type UploadMediaMutationOptions = Apollo.BaseMutationOptions<UploadMediaMutation, UploadMediaMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserValidation!) {
  updateUser(data: $data) {
    message
    status
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateProfilePicDocument = gql`
    mutation UpdateProfilePic($data: UpdateProfilePic!) {
  updateProfilePic(data: $data) {
    message
    message
    status
    status
  }
}
    `;
export type UpdateProfilePicMutationFn = Apollo.MutationFunction<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;

/**
 * __useUpdateProfilePicMutation__
 *
 * To run a mutation, you first call `useUpdateProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfilePicMutation, { data, loading, error }] = useUpdateProfilePicMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>(UpdateProfilePicDocument, options);
      }
export type UpdateProfilePicMutationHookResult = ReturnType<typeof useUpdateProfilePicMutation>;
export type UpdateProfilePicMutationResult = Apollo.MutationResult<UpdateProfilePicMutation>;
export type UpdateProfilePicMutationOptions = Apollo.BaseMutationOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CreateCategoryValidation!) {
  createCategory(data: $data) {
    message
    status
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($data: UpdateCategoryValidation!, $categoryId: String!) {
  updateCategory(data: $data, categoryId: $categoryId) {
    message
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const MovedcategoryDocument = gql`
    mutation movedcategory($categoryId: String!) {
  moveCategoryTrash(categoryId: $categoryId) {
    message
  }
}
    `;
export type MovedcategoryMutationFn = Apollo.MutationFunction<MovedcategoryMutation, MovedcategoryMutationVariables>;

/**
 * __useMovedcategoryMutation__
 *
 * To run a mutation, you first call `useMovedcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovedcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movedcategoryMutation, { data, loading, error }] = useMovedcategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useMovedcategoryMutation(baseOptions?: Apollo.MutationHookOptions<MovedcategoryMutation, MovedcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MovedcategoryMutation, MovedcategoryMutationVariables>(MovedcategoryDocument, options);
      }
export type MovedcategoryMutationHookResult = ReturnType<typeof useMovedcategoryMutation>;
export type MovedcategoryMutationResult = Apollo.MutationResult<MovedcategoryMutation>;
export type MovedcategoryMutationOptions = Apollo.BaseMutationOptions<MovedcategoryMutation, MovedcategoryMutationVariables>;
export const RecoverFromTrashDocument = gql`
    mutation RecoverFromTrash($categoryId: String!) {
  recoverFromTrash(categoryId: $categoryId) {
    message
    status
  }
}
    `;
export type RecoverFromTrashMutationFn = Apollo.MutationFunction<RecoverFromTrashMutation, RecoverFromTrashMutationVariables>;

/**
 * __useRecoverFromTrashMutation__
 *
 * To run a mutation, you first call `useRecoverFromTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverFromTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverFromTrashMutation, { data, loading, error }] = useRecoverFromTrashMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useRecoverFromTrashMutation(baseOptions?: Apollo.MutationHookOptions<RecoverFromTrashMutation, RecoverFromTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecoverFromTrashMutation, RecoverFromTrashMutationVariables>(RecoverFromTrashDocument, options);
      }
export type RecoverFromTrashMutationHookResult = ReturnType<typeof useRecoverFromTrashMutation>;
export type RecoverFromTrashMutationResult = Apollo.MutationResult<RecoverFromTrashMutation>;
export type RecoverFromTrashMutationOptions = Apollo.BaseMutationOptions<RecoverFromTrashMutation, RecoverFromTrashMutationVariables>;
export const DeleteCategoryPermanentDocument = gql`
    mutation DeleteCategoryPermanent($categoryId: String!) {
  deleteCategoryPermanent(categoryId: $categoryId) {
    message
    status
  }
}
    `;
export type DeleteCategoryPermanentMutationFn = Apollo.MutationFunction<DeleteCategoryPermanentMutation, DeleteCategoryPermanentMutationVariables>;

/**
 * __useDeleteCategoryPermanentMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryPermanentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryPermanentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryPermanentMutation, { data, loading, error }] = useDeleteCategoryPermanentMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryPermanentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryPermanentMutation, DeleteCategoryPermanentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryPermanentMutation, DeleteCategoryPermanentMutationVariables>(DeleteCategoryPermanentDocument, options);
      }
export type DeleteCategoryPermanentMutationHookResult = ReturnType<typeof useDeleteCategoryPermanentMutation>;
export type DeleteCategoryPermanentMutationResult = Apollo.MutationResult<DeleteCategoryPermanentMutation>;
export type DeleteCategoryPermanentMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryPermanentMutation, DeleteCategoryPermanentMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($data: CreateEventValidator!) {
  createEvent(data: $data) {
    message
    message
    status
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    createdAt
    fullName
    email
    phone
    role
    authType
    isVerified
    address
    organizerDetails {
      id
      createdAt
      organizerName
      address
      bio
      website
      status
      isGstRegister
      abnAcn
      socialLinks {
        facebook
        instagram
        twitter
        threads
      }
    }
    organizerDocuments {
      id
      documents {
        name
      }
      logo {
        name
      }
    }
    profile {
      name
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMyCategoryDocument = gql`
    query GetMyCategory($query: CommonQuery!) {
  getMyCategory(query: $query) {
    data {
      description
      id
      name
    }
    meta {
      currentPage
      lastPage
      prevPage
      totalCount
      nextPage
    }
  }
}
    `;

/**
 * __useGetMyCategoryQuery__
 *
 * To run a query within a React component, call `useGetMyCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCategoryQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetMyCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetMyCategoryQuery, GetMyCategoryQueryVariables> & ({ variables: GetMyCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCategoryQuery, GetMyCategoryQueryVariables>(GetMyCategoryDocument, options);
      }
export function useGetMyCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCategoryQuery, GetMyCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCategoryQuery, GetMyCategoryQueryVariables>(GetMyCategoryDocument, options);
        }
export function useGetMyCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyCategoryQuery, GetMyCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyCategoryQuery, GetMyCategoryQueryVariables>(GetMyCategoryDocument, options);
        }
export type GetMyCategoryQueryHookResult = ReturnType<typeof useGetMyCategoryQuery>;
export type GetMyCategoryLazyQueryHookResult = ReturnType<typeof useGetMyCategoryLazyQuery>;
export type GetMyCategorySuspenseQueryHookResult = ReturnType<typeof useGetMyCategorySuspenseQuery>;
export type GetMyCategoryQueryResult = Apollo.QueryResult<GetMyCategoryQuery, GetMyCategoryQueryVariables>;
export const GetMyTrashedCategoryDocument = gql`
    query GetMyTrashedCategory($query: CommonQuery!) {
  getMyTrashedCategory(query: $query) {
    data {
      description
      id
      name
      deletedAt
    }
    meta {
      currentPage
      lastPage
      nextPage
      prevPage
      totalCount
    }
  }
}
    `;

/**
 * __useGetMyTrashedCategoryQuery__
 *
 * To run a query within a React component, call `useGetMyTrashedCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTrashedCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTrashedCategoryQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetMyTrashedCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables> & ({ variables: GetMyTrashedCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>(GetMyTrashedCategoryDocument, options);
      }
export function useGetMyTrashedCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>(GetMyTrashedCategoryDocument, options);
        }
export function useGetMyTrashedCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>(GetMyTrashedCategoryDocument, options);
        }
export type GetMyTrashedCategoryQueryHookResult = ReturnType<typeof useGetMyTrashedCategoryQuery>;
export type GetMyTrashedCategoryLazyQueryHookResult = ReturnType<typeof useGetMyTrashedCategoryLazyQuery>;
export type GetMyTrashedCategorySuspenseQueryHookResult = ReturnType<typeof useGetMyTrashedCategorySuspenseQuery>;
export type GetMyTrashedCategoryQueryResult = Apollo.QueryResult<GetMyTrashedCategoryQuery, GetMyTrashedCategoryQueryVariables>;
export const GetMyEventsDocument = gql`
    query GetMyEvents($query: CommonQuery!) {
  getMyEvents(query: $query) {
    data {
      eventEndDate
      cover {
        name
      }
      description
      eventStartDate
      images {
        name
      }
      name
      rejectionCount
      type
      type
      status
      venue
      id
      createdAt
    }
    meta {
      currentPage
      prevPage
      nextPage
      lastPage
      totalCount
    }
  }
}
    `;

/**
 * __useGetMyEventsQuery__
 *
 * To run a query within a React component, call `useGetMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEventsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetMyEventsQuery(baseOptions: Apollo.QueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables> & ({ variables: GetMyEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
      }
export function useGetMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
        }
export function useGetMyEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
        }
export type GetMyEventsQueryHookResult = ReturnType<typeof useGetMyEventsQuery>;
export type GetMyEventsLazyQueryHookResult = ReturnType<typeof useGetMyEventsLazyQuery>;
export type GetMyEventsSuspenseQueryHookResult = ReturnType<typeof useGetMyEventsSuspenseQuery>;
export type GetMyEventsQueryResult = Apollo.QueryResult<GetMyEventsQuery, GetMyEventsQueryVariables>;