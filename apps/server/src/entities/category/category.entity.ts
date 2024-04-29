import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { OrganizerDetails } from "../user/organizerDetails.entity";
import { Event } from "../event/event.entity";
@Entity()
@ObjectType()
export class Category extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  @Index()
  name: string;

  @Field(() => String)
  @Column({ type: "text", nullable: false })
  description: string;

  @ManyToOne(() => OrganizerDetails, (category) => category.category, {
    cascade: true,
  })
  organizer: OrganizerDetails;

  @OneToMany(() => Event, (event) => event.category, { cascade: true })
  event: Event[];
}
