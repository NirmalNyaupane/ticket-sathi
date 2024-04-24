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

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

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
  createdAt: Scalars['String']['output'];
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
  id?: Maybe<Scalars['String']['output']>;
  mediaType?: Maybe<MediaType>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum MediaType {
  OrganizerDocument = 'ORGANIZER_DOCUMENT',
  UserProfile = 'USER_PROFILE'
}

export type Mutation = {
  __typename?: 'Mutation';
  forgotPasswordRequest: CommonResponse;
  getAccessToken: AccessTokenResponse;
  login: LoginUserResponse;
  registerUser: RegisterUserResponse;
  resetForgotPassword: CommonResponse;
  updateUser: CommonResponse;
  uploadMedia: MediaSchema;
  verifyOtp: CommonResponse;
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


export type MutationRegisterUserArgs = {
  data: RegisterUserSchema;
};


export type MutationResetForgotPasswordArgs = {
  data: ResetForgotPasswordValidator;
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
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isGstRegister: Scalars['Boolean']['output'];
  organizerName: Scalars['String']['output'];
  socialLinks?: Maybe<SocialLinksResponse>;
  status: OrganizerStatus;
  website?: Maybe<Scalars['String']['output']>;
};

export type OrganizerDocuments = {
  __typename?: 'OrganizerDocuments';
  createdAt: Scalars['String']['output'];
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

export type Query = {
  __typename?: 'Query';
  getCurrentUser: UserResponse;
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

export type UpdateUserValidation = {
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
  authType: AuthType;
  createdAt: Scalars['String']['output'];
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


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'MediaSchema', id?: string | null, name?: string | null, mimeType?: string | null, mediaType?: MediaType | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'UserResponse', id: string, createdAt: string, fullName: string, email: string, phone: string, role: UserRole, authType: AuthType, isVerified: boolean, organizerDetails?: { __typename?: 'OrganizerDetails', id: string, createdAt: string, organizerName: string, address: string, bio?: string | null, website?: string | null, status: OrganizerStatus, isGstRegister: boolean, abnAcn: string, socialLinks?: { __typename?: 'SocialLinksResponse', facebook?: string | null, instagram?: string | null, twitter?: string | null, threads?: string | null } | null } | null, organizerDocuments?: { __typename?: 'OrganizerDocuments', id: string, documents?: Array<{ __typename?: 'Media', name?: string | null }> | null, logo?: { __typename?: 'Media', name?: string | null } | null } | null, profile?: { __typename?: 'Media', name?: string | null } | null } };


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