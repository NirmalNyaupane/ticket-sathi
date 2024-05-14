import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from "class-validator";
import { Field, Float, InputType, Int } from "type-graphql";
import { DiscountType } from "../../constants/enums/ticket.enum";
import { IsFutureDate } from "../customdecorator/validateDate";
type UUID = `${string}-${string}-${string}-${string}-${string}`;


@InputType()
class CreateTicketValidator {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  name: string;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isUnlimited: boolean;

  @Field(() => Int, { nullable: true })
  @ValidateIf((field) => !field.isUnlimited)
  @IsNumber()
  @IsNotEmpty()
  totalTicket: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  earlyBirdOffer: boolean;

  @Field(() => DiscountType, {nullable:true})
  @ValidateIf((field) => field.earlyBirdOffer)
  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Field(() => Int, { nullable: true })
  @ValidateIf((field) => field.earlyBirdOffer)
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @Field(() => String, { nullable: true })
  @ValidateIf((field) => field.earlyBirdOffer)
  @IsFutureDate()
  @IsISO8601()
  @IsNotEmpty()
  discountEndDate: Date;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  eventId: UUID;
}

@InputType()
class UpdateTicketValidator {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  name: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isUnlimited: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  totalTicket: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  earlyBirdOffer: boolean;

  @Field(() => DiscountType, { nullable: true })
  @IsOptional()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  discount: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsFutureDate()
  @IsISO8601()
  @IsNotEmpty()
  discountEndDate: Date;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  ticketsId: UUID;
}

export { CreateTicketValidator, UpdateTicketValidator };
