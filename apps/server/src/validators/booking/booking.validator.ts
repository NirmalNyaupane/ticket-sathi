import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { PaymentMethod } from "../../constants/enums/booking.enum";
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

@InputType()
export class CreateBookingValidator {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  fullName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  address: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  city: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  state: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  country: string;

  @Field(() => String)
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(5)
  zipCode: string;

  @Field(() => PaymentMethod)
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  ticketId: UUID;

  @Field(()=>Number)
  @IsNotEmpty()
  @IsNumber()
  ticketQuantity:number;

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsUUID()
  couponId:UUID;
}
