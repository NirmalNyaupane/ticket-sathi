import { Field, ObjectType } from "type-graphql";
import { AuthType, UserRole } from "../../constants/enums/auth.enum";
import { Media } from "../../entities/media/media.entity";
import { OrganizerDetails } from '../../entities/user/organizerDetails.entity';
import { OrganizerDocuments } from '../../entities/user/organizerDocuments.entity';

@ObjectType()
class UserResponse {
    @Field(() => String)
    fullName: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phone: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => Boolean)
    isVerified: string;

    @Field(() => AuthType)
    authType: AuthType;

    @Field(() => Media, { nullable: true })
    profile: Media;

    @Field(() => OrganizerDetails, { nullable: true })
    organizerDetails: OrganizerDetails;

    @Field(() => OrganizerDocuments, { nullable: true })
    OrganizerDocuments: OrganizerDocuments
}

@ObjectType()
class AccessTokenResponse{
    @Field(()=>String)
    accessToken:string;
}


export { UserResponse, AccessTokenResponse };
