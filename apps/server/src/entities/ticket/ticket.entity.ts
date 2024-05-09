import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { DiscountType } from "../../constants/enums/ticket.enum";
import { CommonEntity } from "../common/common.entity";
import { Event } from "../event/event.entity";
@ObjectType()
@Entity()
export class Ticket extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  isUnlimited: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  totalTicket: number;

  @Field(() => Float)
  @Column({ type: "float" })
  price: number;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  earlyBirdOffer: boolean;

  @Field(() => DiscountType)
  @Column({ type: "enum", enum: DiscountType })
  discountType: DiscountType;

  @Field(() => Int, { nullable: true })
  @Column({ type: "float", nullable: true })
  discount: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  discountEndDate: Date;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;
}
