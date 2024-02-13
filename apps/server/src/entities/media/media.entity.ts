import { Column, Entity } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { MediaType } from "../../constants/enums/media.enum";

@ObjectType()
@Entity({ name: "media" })
export class Media extends CommonEntity {
  @Field(() => String, { nullable: true })
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column()
  mimeType: string;

  @Field(() => MediaType, { nullable: true })
  @Column({ type: "enum", enum: MediaType })
  mediaType: MediaType;
}

