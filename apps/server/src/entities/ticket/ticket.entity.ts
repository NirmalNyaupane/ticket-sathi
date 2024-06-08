import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { DiscountType, TicketStatus } from "../../constants/enums/ticket.enum";
import { CommonEntity } from "../common/common.entity";
import { Event } from "../event/event.entity";
import { Coupon } from "../coupons/coupons.entity";
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
  @Column({ type: "boolean", default: false })
  earlyBirdOffer: boolean;

  @Field(() => DiscountType, { nullable: true })
  @Column({ type: "enum", enum: DiscountType, nullable: true })
  discountType: DiscountType;

  @Field(() => Int, { nullable: true })
  @Column({ type: "float", nullable: true })
  discount: number;

  @Field(() => TicketStatus)
  @Column({ type: "enum", enum: TicketStatus, default: TicketStatus.ACTIVE })
  status: TicketStatus;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  discountEndDate: Date;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @OneToMany(()=>Coupon, (coupon)=>coupon.ticket)
  coupons:Ticket[]
}
