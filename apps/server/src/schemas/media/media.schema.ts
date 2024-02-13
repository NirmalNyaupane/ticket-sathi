import { Field, InputType, ObjectType} from "type-graphql";
import { MediaType } from "../../constants/enums/media.enum";

@InputType()
class MediaInput {
    @Field(() => String, { nullable: true })
    id: string;

    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    mimeType: string;

    @Field(() => MediaType, { nullable: true })
    mediaType: MediaType;
}

@ObjectType()
class MediaSchema {
    @Field(() => String, { nullable: true })
    id: string;

    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    mimeType: string;

    @Field(() => MediaType, { nullable: true })
    mediaType: MediaType;
 }

export { MediaInput, MediaSchema };