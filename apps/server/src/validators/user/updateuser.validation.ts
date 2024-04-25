import { IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword, Length, ValidateIf } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UpdateUserValidation {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @Length(5)
    fullName: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    address:string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsStrongPassword()
    oldPassword: string;

    @Field(() => String, { nullable: true })
    @ValidateIf((o) => o.oldPassword)
    @IsNotEmpty()
    @IsStrongPassword()
    newPassword: string;

}

export { UpdateUserValidation }