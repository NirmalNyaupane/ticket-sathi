import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne } from "typeorm";
import { OrganizerDetails } from "./organizerDetails.entity";
import { CommonEntity } from '../common/common.entity';

@ObjectType()
@Entity()
export class OrganizerRejectReasons extends CommonEntity {
  @Field(() => String)
  reasons: string;

  @ManyToOne(() => OrganizerDetails, (organizer) => organizer.rejectReasons)
  organizer: OrganizerDetails;
}
