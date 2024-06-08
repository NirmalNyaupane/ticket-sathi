import { Field, InputType } from "type-graphql";
import { CouponType } from "../../constants/enums/coupon.enum";
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from "class-validator";

@InputType()
export class CouponValidator {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1)
  name: string;

  @Field(() => CouponType)
  @IsNotEmpty()
  @IsEnum(CouponType)
  type: CouponType;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isUnlimited: boolean;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @ValidateIf((value) => !value.isUnlimited)
  @IsNotEmpty()
  @IsNumberString()
  totalCoupons: number;

  @Field(() => Date)
  @IsNotEmpty()
  @IsISO8601()
  expires: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  ticketId: string;
}
