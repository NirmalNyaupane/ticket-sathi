import { IsBoolean, IsEmail, IsEnum, IsJWT, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Length, ValidateIf } from "class-validator";
import { Field, InputType } from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import { Media } from "../../entities/media/media.entity";
import { MediaInput } from "../../schemas/media/media.schema";

@InputType()
class RegisterValidator {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @Length(5)
    fullName: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    @Field(() => UserRole)
    role: UserRole;

    @Field(() => String, { nullable: true })
    @ValidateIf((o) => o.role === UserRole.ORGANIZER)
    @IsNotEmpty()
    organizerName: string;

    @Field(() => String, { nullable: true })
    @ValidateIf((o) => o.role === UserRole.ORGANIZER)
    @IsNotEmpty()
    @IsString()
    address: string;

    @Field(() => Boolean, { nullable: true })
    @ValidateIf((o) => o.role === UserRole.ORGANIZER)
    @IsNotEmpty()
    @IsBoolean()
    isGstRegister: boolean;

    @Field(() => String, { nullable: true })
    @ValidateIf((o) => o.role === UserRole.ORGANIZER)
    @IsNotEmpty()
    @IsString()
    abnAcn: string;

    @Field(() => [MediaInput], { nullable: true })
    @ValidateIf((o) => o.role === UserRole.ORGANIZER)
    @IsNotEmpty()
    documents: Media[]
}

@InputType()
class OtpVerifyValidator {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @Length(6, 6, { message: "Otp must be 6 digits" })
    otp: string;
}

@InputType()
class LoginValidator {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}

@InputType()
class ForgotPasswordRequestValidator {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

@InputType()
class ResetForgotPasswordValidator {
    @Field(() => String)
    @IsNotEmpty()
    @IsJWT()
    token: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}

export { OtpVerifyValidator, RegisterValidator, LoginValidator, ForgotPasswordRequestValidator, ResetForgotPasswordValidator }


