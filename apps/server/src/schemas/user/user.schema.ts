import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/user/user.entity";

@ObjectType()
class UserResponse extends User{}

@ObjectType()
class AccessTokenResponse{
    @Field(()=>String)
    accessToken:string;
}


export { AccessTokenResponse, UserResponse };

