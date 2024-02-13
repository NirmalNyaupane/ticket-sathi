import { IsOptional, IsString, IsUrl, Length, ValidateNested } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SocialLinksResponse {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    facebook: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    instagram: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    twitter: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    threads: string;
}


@InputType()
export class SocialLinkInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    facebook: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    instagram: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    twitter: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    threads: string;
}


@InputType()
export class UpdateOrganizerValidator {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    organizerName: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    address: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Length(10)
    bio: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUrl()
    website: string;

    @Field(() => SocialLinksResponse)
    @ValidateNested({ each: true })
    socialLinks: SocialLinkInput
}
