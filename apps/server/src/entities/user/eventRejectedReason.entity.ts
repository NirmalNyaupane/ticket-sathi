import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import { Event } from "../event/event.entity";

@ObjectType()
@Entity()
export class EventRejectReasons extends CommonEntity {
  @Field(() => String)
  reasons: string;

  @ManyToOne(() => Event, (event) => event.rejectedReason)
  event: Event;
}
