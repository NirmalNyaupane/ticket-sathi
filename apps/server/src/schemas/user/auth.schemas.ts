import { Field, InputType, ObjectType } from "type-graphql";
import { RegisterValidator } from "../../validators/auth/register.validator";
import { CommonResponse } from "..";
import { UserRole } from "../../constants/enums/auth.enum";

@InputType()
class RegisterUserSchema extends RegisterValidator { }

@ObjectType()
class User {
    @Field(() => String)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => Boolean)
    isVerified: boolean;
}

@ObjectType()
class RegisterUserResponse extends CommonResponse {
    @Field(() => User)
    user: User
}

@ObjectType()
class LoginUserResponse extends CommonResponse {
    @Field(()=>String)
    id:string;
    
    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;

    @Field(() => UserRole)
    role: string;

    @Field(() => Boolean)
    isVerified: boolean;
}

export { RegisterUserSchema, RegisterUserResponse, LoginUserResponse };
