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

export type AdminEventValidator = {
  eventId: Scalars['String']['input'];
  rejectedReason?: InputMaybe<Scalars['String']['input']>;
  status: EventStatus;
};

export type AdminOrganizerObject = {
  __typename?: 'AdminOrganizerObject';
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

export type AdminOrganizerValidator = {
  organizerId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status: OrganizerStatus;
};

export enum AuthType {
  Apple = 'APPLE',
  Google = 'GOOGLE',
  Traditional = 'TRADITIONAL'
}

export type Booking = {
  __typename?: 'Booking';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  isPaymentComplete: Scalars['Boolean']['output'];
  paymentMethod: PaymentMethod;
  state: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  totalDiscountAmount: Scalars['Float']['output'];
  zipCode: Scalars['String']['output'];
};

export type BookingObjectType = {
  __typename?: 'BookingObjectType';
  booking: Booking;
  esewaPayload: EsewaPayload;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CommissionEntity = {
  __typename?: 'CommissionEntity';
  commission?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
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

export enum CouponType {
  Flat = 'FLAT',
  Percentage = 'PERCENTAGE'
}

export type CouponValidator = {
  expires: Scalars['DateTimeISO']['input'];
  isUnlimited: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  totalCoupons?: InputMaybe<Scalars['Float']['input']>;
  type: CouponType;
};

export type CreateBookingValidator = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  couponId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  paymentMethod: PaymentMethod;
  state: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  ticketQuantity: Scalars['Float']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateCategoryValidation = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCommission = {
  commission: Scalars['Int']['input'];
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

export type CreateTicketValidator = {
  discount?: InputMaybe<Scalars['Int']['input']>;
  discountEndDate?: InputMaybe<Scalars['String']['input']>;
  discountType?: InputMaybe<DiscountType>;
  earlyBirdOffer: Scalars['Boolean']['input'];
  eventId: Scalars['String']['input'];
  isUnlimited: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  totalTicket?: InputMaybe<Scalars['Int']['input']>;
};

/** This is an enum that provide discount type */
export enum DiscountType {
  Flat = 'FLAT',
  Percentage = 'PERCENTAGE'
}

export type EsewaPayload = {
  __typename?: 'EsewaPayload';
  amount: Scalars['String']['output'];
  failure_url: Scalars['String']['output'];
  product_code: Scalars['String']['output'];
  product_delivery_charge: Scalars['String']['output'];
  product_service_charge: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  signed_field_names: Scalars['String']['output'];
  success_url: Scalars['String']['output'];
  tax_amount: Scalars['String']['output'];
  total_amount: Scalars['String']['output'];
  transaction_uuid: Scalars['String']['output'];
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

export type GlobalEventFilter = {
  page?: Scalars['Int']['input'];
  pageLimit?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
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
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  changeOrganizerStatus: CommonResponse;
  createBooking: BookingObjectType;
  /** Role: Organizer */
  createCategory: CommonResponse;
  createCoupon: CommonResponse;
  createEvent: CommonResponse;
  createTicket: CommonResponse;
  createUpdateCommission: CommonResponse;
  deleteCategoryPermanent: CommonResponse;
  deleteTicket: CommonResponse;
  forgotPasswordRequest: CommonResponse;
  getAccessToken: AccessTokenResponse;
  login: LoginUserResponse;
  moveCategoryTrash: CommonResponse;
  recoverFromTrash: CommonResponse;
  registerUser: RegisterUserResponse;
  resetForgotPassword: CommonResponse;
  updateCategory: CommonResponse;
  updateEventStatusByAdmin: CommonResponse;
  updateProfilePic: CommonResponse;
  updateTicket: CommonResponse;
  updateUser: CommonResponse;
  uploadMedia: MediaSchema;
  verifyOtp: CommonResponse;
};


export type MutationChangeOrganizerStatusArgs = {
  data: AdminOrganizerValidator;
};


export type MutationCreateBookingArgs = {
  data: CreateBookingValidator;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryValidation;
};


export type MutationCreateCouponArgs = {
  data: CouponValidator;
};


export type MutationCreateEventArgs = {
  data: CreateEventValidator;
};


export type MutationCreateTicketArgs = {
  data: CreateTicketValidator;
};


export type MutationCreateUpdateCommissionArgs = {
  data: CreateCommission;
};


export type MutationDeleteCategoryPermanentArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationDeleteTicketArgs = {
  ticketId: Scalars['String']['input'];
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


export type MutationUpdateEventStatusByAdminArgs = {
  data: AdminEventValidator;
};


export type MutationUpdateProfilePicArgs = {
  data: UpdateProfilePic;
};


export type MutationUpdateTicketArgs = {
  data: UpdateTicketValidator;
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

export type PaginatedOrganizer = {
  __typename?: 'PaginatedOrganizer';
  data: Array<OrganizerDetails>;
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

export enum PaymentMethod {
  Esewa = 'ESEWA'
}

export type Query = {
  __typename?: 'Query';
  getAllEvents: PaginatedEventObject;
  getAllOpenEvents: PaginatedEventObject;
  getAllOrganizer: PaginatedOrganizer;
  getCommission: Array<CommissionEntity>;
  getCurrentUser: UserResponse;
  getMyCategory: PaginatedOrganizerCategory;
  getMyEvents: PaginatedEventObject;
  getMyTrashedCategory: PaginatedOrganizerCategory;
  getParticularEventForAdmin: Event;
  /** Open */
  getSingleEvent: Event;
  getSingleOrganizerDetails: AdminOrganizerObject;
  getTicketByEventId?: Maybe<Array<Ticket>>;
  getTicketById: Ticket;
  getTicketForParticularEventForAdmin: Event;
  viewEventsTicket: Array<Ticket>;
};


export type QueryGetAllEventsArgs = {
  query: CommonQuery;
};


export type QueryGetAllOpenEventsArgs = {
  data: GlobalEventFilter;
};


export type QueryGetAllOrganizerArgs = {
  query: CommonQuery;
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


export type QueryGetParticularEventForAdminArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetSingleEventArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetSingleOrganizerDetailsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTicketByEventIdArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetTicketByIdArgs = {
  ticketId: Scalars['String']['input'];
};


export type QueryGetTicketForParticularEventForAdminArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryViewEventsTicketArgs = {
  eventId: Scalars['String']['input'];
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

export type Ticket = {
  __typename?: 'Ticket';
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  discount?: Maybe<Scalars['Int']['output']>;
  discountEndDate?: Maybe<Scalars['DateTimeISO']['output']>;
  discountType?: Maybe<DiscountType>;
  earlyBirdOffer: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  isUnlimited: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  status: TicketStatus;
  totalTicket?: Maybe<Scalars['Int']['output']>;
};

/** This is an enum that defines ticket status */
export enum TicketStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type UpdateCategoryValidation = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfilePic = {
  mediaId: Scalars['String']['input'];
};

export type UpdateTicketValidator = {
  discount?: InputMaybe<Scalars['Int']['input']>;
  discountEndDate?: InputMaybe<Scalars['String']['input']>;
  discountType?: InputMaybe<DiscountType>;
  earlyBirdOffer?: InputMaybe<Scalars['Boolean']['input']>;
  isUnlimited?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  ticketsId: Scalars['String']['input'];
  totalTicket?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateTicketMutationVariables = Exact<{
  data: CreateTicketValidator;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'CommonResponse', message: string, status: string } };

export type DeleteTicketMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', deleteTicket: { __typename?: 'CommonResponse', status: string } };

export type UpdateTicketMutationVariables = Exact<{
  data: UpdateTicketValidator;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket: { __typename?: 'CommonResponse', message: string } };

export type ChangeOrganizerStatusMutationVariables = Exact<{
  data: AdminOrganizerValidator;
}>;


export type ChangeOrganizerStatusMutation = { __typename?: 'Mutation', changeOrganizerStatus: { __typename?: 'CommonResponse', message: string } };

export type CreateUpdateCommissionMutationVariables = Exact<{
  data: CreateCommission;
}>;


export type CreateUpdateCommissionMutation = { __typename?: 'Mutation', createUpdateCommission: { __typename?: 'CommonResponse', message: string } };

export type UpdateEventStatusByAdminMutationVariables = Exact<{
  data: AdminEventValidator;
}>;


export type UpdateEventStatusByAdminMutation = { __typename?: 'Mutation', updateEventStatusByAdmin: { __typename?: 'CommonResponse', message: string, status: string } };

export type CreateBookingMutationVariables = Exact<{
  data: CreateBookingValidator;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'BookingObjectType', booking: { __typename?: 'Booking', id: string, createdAt: any, deletedAt?: any | null, fullName: string, address: string, city: string, state: string, country: string, email: string, zipCode: string, invoiceNumber: string, isPaymentComplete: boolean, paymentMethod: PaymentMethod, totalAmount: number, totalDiscountAmount: number }, esewaPayload: { __typename?: 'EsewaPayload', amount: string, failure_url: string, product_delivery_charge: string, product_service_charge: string, product_code: string, signature: string, signed_field_names: string, success_url: string, tax_amount: string, total_amount: string, transaction_uuid: string } } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'UserResponse', id: string, createdAt: any, fullName: string, email: string, phone: string, role: UserRole, authType: AuthType, isVerified: boolean, address?: string | null, organizerDetails?: { __typename?: 'OrganizerDetails', id: string, createdAt: any, organizerName: string, address: string, bio?: string | null, website?: string | null, status: OrganizerStatus, isGstRegister: boolean, abnAcn: string, socialLinks?: { __typename?: 'SocialLinksResponse', facebook?: string | null, instagram?: string | null, twitter?: string | null, threads?: string | null } | null } | null, organizerDocuments?: { __typename?: 'OrganizerDocuments', id: string, documents?: Array<{ __typename?: 'Media', name: string }> | null, logo?: { __typename?: 'Media', name: string } | null } | null, profile?: { __typename?: 'Media', name: string } | null } };

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


export type GetMyEventsQuery = { __typename?: 'Query', getMyEvents: { __typename?: 'PaginatedEventObject', data: Array<{ __typename?: 'Event', eventEndDate: any, description: string, eventStartDate: any, name: string, rejectionCount: number, type: EventType, status: EventStatus, venue: string, id: string, cover: { __typename?: 'Media', name: string }, images: Array<{ __typename?: 'Media', name: string }> }>, meta: { __typename?: 'Pagination', currentPage: number, prevPage?: number | null, nextPage?: number | null, lastPage: number, totalCount: number } } };

export type GetSingleEventQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type GetSingleEventQuery = { __typename?: 'Query', getSingleEvent: { __typename?: 'Event', eventEndDate: any, description: string, eventStartDate: any, name: string, rejectionCount: number, type: EventType, status: EventStatus, venue: string, id: string, cover: { __typename?: 'Media', name: string }, images: Array<{ __typename?: 'Media', name: string }> } };

export type ViewEventsTicketQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type ViewEventsTicketQuery = { __typename?: 'Query', viewEventsTicket: Array<{ __typename?: 'Ticket', discount?: number | null, discountEndDate?: any | null, discountType?: DiscountType | null, earlyBirdOffer: boolean, id: string, isUnlimited: boolean, name: string, totalTicket?: number | null, price: number, status: TicketStatus, createdAt: any }> };

export type GetAllOrganizerQueryVariables = Exact<{
  query: CommonQuery;
}>;


export type GetAllOrganizerQuery = { __typename?: 'Query', getAllOrganizer: { __typename?: 'PaginatedOrganizer', data: Array<{ __typename?: 'OrganizerDetails', abnAcn: string, address: string, bio?: string | null, createdAt: any, organizerName: string, id: string, status: OrganizerStatus }>, meta: { __typename?: 'Pagination', currentPage: number, lastPage: number, nextPage?: number | null, prevPage?: number | null, totalCount: number } } };

export type GetSingleOrganizerDetailsQueryVariables = Exact<{
  getSingleOrganizerDetailsId: Scalars['String']['input'];
}>;


export type GetSingleOrganizerDetailsQuery = { __typename?: 'Query', getSingleOrganizerDetails: { __typename?: 'AdminOrganizerObject', role: UserRole, phone: string, isVerified: boolean, id: string, fullName: string, email: string, address?: string | null, profile?: { __typename?: 'Media', name: string } | null, organizerDocuments?: { __typename?: 'OrganizerDocuments', logo?: { __typename?: 'Media', name: string } | null, documents?: Array<{ __typename?: 'Media', name: string }> | null } | null, organizerDetails?: { __typename?: 'OrganizerDetails', abnAcn: string, address: string, bio?: string | null, createdAt: any, deletedAt?: any | null, id: string, organizerName: string, isGstRegister: boolean, status: OrganizerStatus, website?: string | null, socialLinks?: { __typename?: 'SocialLinksResponse', facebook?: string | null, instagram?: string | null, threads?: string | null, twitter?: string | null } | null } | null } };

export type GetAllEventsQueryVariables = Exact<{
  query: CommonQuery;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', getAllEvents: { __typename?: 'PaginatedEventObject', data: Array<{ __typename?: 'Event', createdAt: any, description: string, eventEndDate: any, eventStartDate: any, id: string, name: string, status: EventStatus, type: EventType, venue: string }>, meta: { __typename?: 'Pagination', currentPage: number, lastPage: number, nextPage?: number | null, prevPage?: number | null, totalCount: number } } };

export type GetParticularEventForAdminQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type GetParticularEventForAdminQuery = { __typename?: 'Query', getParticularEventForAdmin: { __typename?: 'Event', description: string, eventEndDate: any, eventStartDate: any, id: string, name: string, status: EventStatus, rejectionCount: number, type: EventType, venue: string, cover: { __typename?: 'Media', name: string }, images: Array<{ __typename?: 'Media', name: string }> } };

export type GetCommissionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommissionQuery = { __typename?: 'Query', getCommission: Array<{ __typename?: 'CommissionEntity', commission?: number | null, createdAt: any, deletedAt?: any | null, id: string }> };

export type GetAllOpenEventsQueryVariables = Exact<{
  data: GlobalEventFilter;
}>;


export type GetAllOpenEventsQuery = { __typename?: 'Query', getAllOpenEvents: { __typename?: 'PaginatedEventObject', data: Array<{ __typename?: 'Event', eventStartDate: any, id: string, name: string, type: EventType, venue: string, description: string, cover: { __typename?: 'Media', name: string } }>, meta: { __typename?: 'Pagination', currentPage: number, lastPage: number, nextPage?: number | null, prevPage?: number | null, totalCount: number } } };

export type GetTicketByEventIdQueryVariables = Exact<{
  ticketId: Scalars['String']['input'];
}>;


export type GetTicketByEventIdQuery = { __typename?: 'Query', getTicketByEventId?: Array<{ __typename?: 'Ticket', id: string, createdAt: any, deletedAt?: any | null, name: string, isUnlimited: boolean, totalTicket?: number | null, price: number, earlyBirdOffer: boolean, discountType?: DiscountType | null, discount?: number | null, status: TicketStatus, discountEndDate?: any | null }> | null };

export type GetTicketByIdQueryVariables = Exact<{
  ticketId: Scalars['String']['input'];
}>;


export type GetTicketByIdQuery = { __typename?: 'Query', getTicketById: { __typename?: 'Ticket', discount?: number | null, discountEndDate?: any | null, discountType?: DiscountType | null, earlyBirdOffer: boolean, id: string, isUnlimited: boolean, name: string, price: number, status: TicketStatus, totalTicket?: number | null } };


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
export const CreateTicketDocument = gql`
    mutation CreateTicket($data: CreateTicketValidator!) {
  createTicket(data: $data) {
    message
    status
  }
}
    `;
export type CreateTicketMutationFn = Apollo.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, options);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = Apollo.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = Apollo.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation DeleteTicket($ticketId: String!) {
  deleteTicket(ticketId: $ticketId) {
    status
  }
}
    `;
export type DeleteTicketMutationFn = Apollo.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, options);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = Apollo.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = Apollo.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const UpdateTicketDocument = gql`
    mutation UpdateTicket($data: UpdateTicketValidator!) {
  updateTicket(data: $data) {
    message
  }
}
    `;
export type UpdateTicketMutationFn = Apollo.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, options);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = Apollo.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = Apollo.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;
export const ChangeOrganizerStatusDocument = gql`
    mutation ChangeOrganizerStatus($data: AdminOrganizerValidator!) {
  changeOrganizerStatus(data: $data) {
    message
  }
}
    `;
export type ChangeOrganizerStatusMutationFn = Apollo.MutationFunction<ChangeOrganizerStatusMutation, ChangeOrganizerStatusMutationVariables>;

/**
 * __useChangeOrganizerStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrganizerStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrganizerStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrganizerStatusMutation, { data, loading, error }] = useChangeOrganizerStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeOrganizerStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrganizerStatusMutation, ChangeOrganizerStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrganizerStatusMutation, ChangeOrganizerStatusMutationVariables>(ChangeOrganizerStatusDocument, options);
      }
export type ChangeOrganizerStatusMutationHookResult = ReturnType<typeof useChangeOrganizerStatusMutation>;
export type ChangeOrganizerStatusMutationResult = Apollo.MutationResult<ChangeOrganizerStatusMutation>;
export type ChangeOrganizerStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrganizerStatusMutation, ChangeOrganizerStatusMutationVariables>;
export const CreateUpdateCommissionDocument = gql`
    mutation CreateUpdateCommission($data: CreateCommission!) {
  createUpdateCommission(data: $data) {
    message
  }
}
    `;
export type CreateUpdateCommissionMutationFn = Apollo.MutationFunction<CreateUpdateCommissionMutation, CreateUpdateCommissionMutationVariables>;

/**
 * __useCreateUpdateCommissionMutation__
 *
 * To run a mutation, you first call `useCreateUpdateCommissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUpdateCommissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUpdateCommissionMutation, { data, loading, error }] = useCreateUpdateCommissionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUpdateCommissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateUpdateCommissionMutation, CreateUpdateCommissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUpdateCommissionMutation, CreateUpdateCommissionMutationVariables>(CreateUpdateCommissionDocument, options);
      }
export type CreateUpdateCommissionMutationHookResult = ReturnType<typeof useCreateUpdateCommissionMutation>;
export type CreateUpdateCommissionMutationResult = Apollo.MutationResult<CreateUpdateCommissionMutation>;
export type CreateUpdateCommissionMutationOptions = Apollo.BaseMutationOptions<CreateUpdateCommissionMutation, CreateUpdateCommissionMutationVariables>;
export const UpdateEventStatusByAdminDocument = gql`
    mutation UpdateEventStatusByAdmin($data: AdminEventValidator!) {
  updateEventStatusByAdmin(data: $data) {
    message
    status
  }
}
    `;
export type UpdateEventStatusByAdminMutationFn = Apollo.MutationFunction<UpdateEventStatusByAdminMutation, UpdateEventStatusByAdminMutationVariables>;

/**
 * __useUpdateEventStatusByAdminMutation__
 *
 * To run a mutation, you first call `useUpdateEventStatusByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventStatusByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventStatusByAdminMutation, { data, loading, error }] = useUpdateEventStatusByAdminMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEventStatusByAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventStatusByAdminMutation, UpdateEventStatusByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventStatusByAdminMutation, UpdateEventStatusByAdminMutationVariables>(UpdateEventStatusByAdminDocument, options);
      }
export type UpdateEventStatusByAdminMutationHookResult = ReturnType<typeof useUpdateEventStatusByAdminMutation>;
export type UpdateEventStatusByAdminMutationResult = Apollo.MutationResult<UpdateEventStatusByAdminMutation>;
export type UpdateEventStatusByAdminMutationOptions = Apollo.BaseMutationOptions<UpdateEventStatusByAdminMutation, UpdateEventStatusByAdminMutationVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($data: CreateBookingValidator!) {
  createBooking(data: $data) {
    booking {
      id
      createdAt
      deletedAt
      fullName
      address
      city
      state
      country
      email
      zipCode
      invoiceNumber
      isPaymentComplete
      paymentMethod
      totalAmount
      totalDiscountAmount
    }
    esewaPayload {
      amount
      failure_url
      product_delivery_charge
      product_service_charge
      product_code
      signature
      signed_field_names
      success_url
      tax_amount
      total_amount
      transaction_uuid
    }
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
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
export const GetSingleEventDocument = gql`
    query GetSingleEvent($eventId: String!) {
  getSingleEvent(eventId: $eventId) {
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
  }
}
    `;

/**
 * __useGetSingleEventQuery__
 *
 * To run a query within a React component, call `useGetSingleEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetSingleEventQuery(baseOptions: Apollo.QueryHookOptions<GetSingleEventQuery, GetSingleEventQueryVariables> & ({ variables: GetSingleEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleEventQuery, GetSingleEventQueryVariables>(GetSingleEventDocument, options);
      }
export function useGetSingleEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleEventQuery, GetSingleEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleEventQuery, GetSingleEventQueryVariables>(GetSingleEventDocument, options);
        }
export function useGetSingleEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSingleEventQuery, GetSingleEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSingleEventQuery, GetSingleEventQueryVariables>(GetSingleEventDocument, options);
        }
export type GetSingleEventQueryHookResult = ReturnType<typeof useGetSingleEventQuery>;
export type GetSingleEventLazyQueryHookResult = ReturnType<typeof useGetSingleEventLazyQuery>;
export type GetSingleEventSuspenseQueryHookResult = ReturnType<typeof useGetSingleEventSuspenseQuery>;
export type GetSingleEventQueryResult = Apollo.QueryResult<GetSingleEventQuery, GetSingleEventQueryVariables>;
export const ViewEventsTicketDocument = gql`
    query ViewEventsTicket($eventId: String!) {
  viewEventsTicket(eventId: $eventId) {
    discount
    discountEndDate
    discountType
    earlyBirdOffer
    id
    isUnlimited
    name
    totalTicket
    price
    status
    createdAt
  }
}
    `;

/**
 * __useViewEventsTicketQuery__
 *
 * To run a query within a React component, call `useViewEventsTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewEventsTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewEventsTicketQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useViewEventsTicketQuery(baseOptions: Apollo.QueryHookOptions<ViewEventsTicketQuery, ViewEventsTicketQueryVariables> & ({ variables: ViewEventsTicketQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>(ViewEventsTicketDocument, options);
      }
export function useViewEventsTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>(ViewEventsTicketDocument, options);
        }
export function useViewEventsTicketSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>(ViewEventsTicketDocument, options);
        }
export type ViewEventsTicketQueryHookResult = ReturnType<typeof useViewEventsTicketQuery>;
export type ViewEventsTicketLazyQueryHookResult = ReturnType<typeof useViewEventsTicketLazyQuery>;
export type ViewEventsTicketSuspenseQueryHookResult = ReturnType<typeof useViewEventsTicketSuspenseQuery>;
export type ViewEventsTicketQueryResult = Apollo.QueryResult<ViewEventsTicketQuery, ViewEventsTicketQueryVariables>;
export const GetAllOrganizerDocument = gql`
    query GetAllOrganizer($query: CommonQuery!) {
  getAllOrganizer(query: $query) {
    data {
      abnAcn
      address
      bio
      createdAt
      organizerName
      id
      status
      address
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
 * __useGetAllOrganizerQuery__
 *
 * To run a query within a React component, call `useGetAllOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrganizerQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetAllOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetAllOrganizerQuery, GetAllOrganizerQueryVariables> & ({ variables: GetAllOrganizerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>(GetAllOrganizerDocument, options);
      }
export function useGetAllOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>(GetAllOrganizerDocument, options);
        }
export function useGetAllOrganizerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>(GetAllOrganizerDocument, options);
        }
export type GetAllOrganizerQueryHookResult = ReturnType<typeof useGetAllOrganizerQuery>;
export type GetAllOrganizerLazyQueryHookResult = ReturnType<typeof useGetAllOrganizerLazyQuery>;
export type GetAllOrganizerSuspenseQueryHookResult = ReturnType<typeof useGetAllOrganizerSuspenseQuery>;
export type GetAllOrganizerQueryResult = Apollo.QueryResult<GetAllOrganizerQuery, GetAllOrganizerQueryVariables>;
export const GetSingleOrganizerDetailsDocument = gql`
    query GetSingleOrganizerDetails($getSingleOrganizerDetailsId: String!) {
  getSingleOrganizerDetails(id: $getSingleOrganizerDetailsId) {
    role
    profile {
      name
    }
    phone
    organizerDocuments {
      logo {
        name
      }
      documents {
        name
      }
    }
    organizerDetails {
      abnAcn
      address
      bio
      createdAt
      deletedAt
      id
      organizerName
      isGstRegister
      socialLinks {
        facebook
        instagram
        threads
        twitter
      }
      status
      website
    }
    isVerified
    id
    fullName
    email
    address
  }
}
    `;

/**
 * __useGetSingleOrganizerDetailsQuery__
 *
 * To run a query within a React component, call `useGetSingleOrganizerDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleOrganizerDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleOrganizerDetailsQuery({
 *   variables: {
 *      getSingleOrganizerDetailsId: // value for 'getSingleOrganizerDetailsId'
 *   },
 * });
 */
export function useGetSingleOrganizerDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables> & ({ variables: GetSingleOrganizerDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>(GetSingleOrganizerDetailsDocument, options);
      }
export function useGetSingleOrganizerDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>(GetSingleOrganizerDetailsDocument, options);
        }
export function useGetSingleOrganizerDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>(GetSingleOrganizerDetailsDocument, options);
        }
export type GetSingleOrganizerDetailsQueryHookResult = ReturnType<typeof useGetSingleOrganizerDetailsQuery>;
export type GetSingleOrganizerDetailsLazyQueryHookResult = ReturnType<typeof useGetSingleOrganizerDetailsLazyQuery>;
export type GetSingleOrganizerDetailsSuspenseQueryHookResult = ReturnType<typeof useGetSingleOrganizerDetailsSuspenseQuery>;
export type GetSingleOrganizerDetailsQueryResult = Apollo.QueryResult<GetSingleOrganizerDetailsQuery, GetSingleOrganizerDetailsQueryVariables>;
export const GetAllEventsDocument = gql`
    query GetAllEvents($query: CommonQuery!) {
  getAllEvents(query: $query) {
    data {
      createdAt
      description
      eventEndDate
      eventStartDate
      id
      name
      status
      type
      venue
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
 * __useGetAllEventsQuery__
 *
 * To run a query within a React component, call `useGetAllEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEventsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetAllEventsQuery(baseOptions: Apollo.QueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables> & ({ variables: GetAllEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
      }
export function useGetAllEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
        }
export function useGetAllEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
        }
export type GetAllEventsQueryHookResult = ReturnType<typeof useGetAllEventsQuery>;
export type GetAllEventsLazyQueryHookResult = ReturnType<typeof useGetAllEventsLazyQuery>;
export type GetAllEventsSuspenseQueryHookResult = ReturnType<typeof useGetAllEventsSuspenseQuery>;
export type GetAllEventsQueryResult = Apollo.QueryResult<GetAllEventsQuery, GetAllEventsQueryVariables>;
export const GetParticularEventForAdminDocument = gql`
    query GetParticularEventForAdmin($eventId: String!) {
  getParticularEventForAdmin(eventId: $eventId) {
    cover {
      name
    }
    description
    eventEndDate
    eventStartDate
    id
    images {
      name
    }
    name
    status
    rejectionCount
    type
    venue
  }
}
    `;

/**
 * __useGetParticularEventForAdminQuery__
 *
 * To run a query within a React component, call `useGetParticularEventForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticularEventForAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticularEventForAdminQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetParticularEventForAdminQuery(baseOptions: Apollo.QueryHookOptions<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables> & ({ variables: GetParticularEventForAdminQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>(GetParticularEventForAdminDocument, options);
      }
export function useGetParticularEventForAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>(GetParticularEventForAdminDocument, options);
        }
export function useGetParticularEventForAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>(GetParticularEventForAdminDocument, options);
        }
export type GetParticularEventForAdminQueryHookResult = ReturnType<typeof useGetParticularEventForAdminQuery>;
export type GetParticularEventForAdminLazyQueryHookResult = ReturnType<typeof useGetParticularEventForAdminLazyQuery>;
export type GetParticularEventForAdminSuspenseQueryHookResult = ReturnType<typeof useGetParticularEventForAdminSuspenseQuery>;
export type GetParticularEventForAdminQueryResult = Apollo.QueryResult<GetParticularEventForAdminQuery, GetParticularEventForAdminQueryVariables>;
export const GetCommissionDocument = gql`
    query GetCommission {
  getCommission {
    commission
    createdAt
    deletedAt
    id
  }
}
    `;

/**
 * __useGetCommissionQuery__
 *
 * To run a query within a React component, call `useGetCommissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommissionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCommissionQuery(baseOptions?: Apollo.QueryHookOptions<GetCommissionQuery, GetCommissionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommissionQuery, GetCommissionQueryVariables>(GetCommissionDocument, options);
      }
export function useGetCommissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommissionQuery, GetCommissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommissionQuery, GetCommissionQueryVariables>(GetCommissionDocument, options);
        }
export function useGetCommissionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommissionQuery, GetCommissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommissionQuery, GetCommissionQueryVariables>(GetCommissionDocument, options);
        }
export type GetCommissionQueryHookResult = ReturnType<typeof useGetCommissionQuery>;
export type GetCommissionLazyQueryHookResult = ReturnType<typeof useGetCommissionLazyQuery>;
export type GetCommissionSuspenseQueryHookResult = ReturnType<typeof useGetCommissionSuspenseQuery>;
export type GetCommissionQueryResult = Apollo.QueryResult<GetCommissionQuery, GetCommissionQueryVariables>;
export const GetAllOpenEventsDocument = gql`
    query GetAllOpenEvents($data: GlobalEventFilter!) {
  getAllOpenEvents(data: $data) {
    data {
      cover {
        name
      }
      eventStartDate
      id
      name
      type
      venue
      description
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
 * __useGetAllOpenEventsQuery__
 *
 * To run a query within a React component, call `useGetAllOpenEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOpenEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOpenEventsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAllOpenEventsQuery(baseOptions: Apollo.QueryHookOptions<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables> & ({ variables: GetAllOpenEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>(GetAllOpenEventsDocument, options);
      }
export function useGetAllOpenEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>(GetAllOpenEventsDocument, options);
        }
export function useGetAllOpenEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>(GetAllOpenEventsDocument, options);
        }
export type GetAllOpenEventsQueryHookResult = ReturnType<typeof useGetAllOpenEventsQuery>;
export type GetAllOpenEventsLazyQueryHookResult = ReturnType<typeof useGetAllOpenEventsLazyQuery>;
export type GetAllOpenEventsSuspenseQueryHookResult = ReturnType<typeof useGetAllOpenEventsSuspenseQuery>;
export type GetAllOpenEventsQueryResult = Apollo.QueryResult<GetAllOpenEventsQuery, GetAllOpenEventsQueryVariables>;
export const GetTicketByEventIdDocument = gql`
    query GetTicketByEventId($ticketId: String!) {
  getTicketByEventId(eventId: $ticketId) {
    id
    createdAt
    deletedAt
    name
    isUnlimited
    totalTicket
    price
    earlyBirdOffer
    discountType
    discount
    status
    discountEndDate
  }
}
    `;

/**
 * __useGetTicketByEventIdQuery__
 *
 * To run a query within a React component, call `useGetTicketByEventIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketByEventIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketByEventIdQuery({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useGetTicketByEventIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables> & ({ variables: GetTicketByEventIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>(GetTicketByEventIdDocument, options);
      }
export function useGetTicketByEventIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>(GetTicketByEventIdDocument, options);
        }
export function useGetTicketByEventIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>(GetTicketByEventIdDocument, options);
        }
export type GetTicketByEventIdQueryHookResult = ReturnType<typeof useGetTicketByEventIdQuery>;
export type GetTicketByEventIdLazyQueryHookResult = ReturnType<typeof useGetTicketByEventIdLazyQuery>;
export type GetTicketByEventIdSuspenseQueryHookResult = ReturnType<typeof useGetTicketByEventIdSuspenseQuery>;
export type GetTicketByEventIdQueryResult = Apollo.QueryResult<GetTicketByEventIdQuery, GetTicketByEventIdQueryVariables>;
export const GetTicketByIdDocument = gql`
    query GetTicketById($ticketId: String!) {
  getTicketById(ticketId: $ticketId) {
    discount
    discountEndDate
    discountType
    earlyBirdOffer
    id
    isUnlimited
    name
    price
    status
    totalTicket
  }
}
    `;

/**
 * __useGetTicketByIdQuery__
 *
 * To run a query within a React component, call `useGetTicketByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketByIdQuery({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useGetTicketByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables> & ({ variables: GetTicketByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
      }
export function useGetTicketByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
        }
export function useGetTicketByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
        }
export type GetTicketByIdQueryHookResult = ReturnType<typeof useGetTicketByIdQuery>;
export type GetTicketByIdLazyQueryHookResult = ReturnType<typeof useGetTicketByIdLazyQuery>;
export type GetTicketByIdSuspenseQueryHookResult = ReturnType<typeof useGetTicketByIdSuspenseQuery>;
export type GetTicketByIdQueryResult = Apollo.QueryResult<GetTicketByIdQuery, GetTicketByIdQueryVariables>;