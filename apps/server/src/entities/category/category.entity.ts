import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { OrganizerDetails } from "../user/organizerDetails.entity";

@Entity()
@ObjectType()
export class Category extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ type: "text", nullable: false })
  description: string;

  @ManyToOne(()=>OrganizerDetails, (category)=>category.category)
  organizer:OrganizerDetails
}
