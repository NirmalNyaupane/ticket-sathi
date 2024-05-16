import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { MediaType } from "../../constants/enums/media.enum";
import { Event } from "../event/event.entity";
@ObjectType()
@Entity({ name: "media" })
export class Media extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  mimeType: string;

  @Field(() => MediaType, { nullable: true })
  @Column({ type: "enum", enum: MediaType })
  mediaType: MediaType;

  @ManyToOne(() => Event, (e) => e.images)
  event: Event;
}
