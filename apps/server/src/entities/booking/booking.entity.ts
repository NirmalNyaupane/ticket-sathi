import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { Coupon } from "../coupons/coupons.entity";
import { PaymentMethod } from "../../constants/enums/booking.enum";
import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user.entity";
import { Ticket } from "../ticket/ticket.entity";
@Entity()
@ObjectType()
export class Booking extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  fullName: string;
  @Field(() => String)
  @Column({ nullable: false })
  address: string;
  @Field(() => String)
  @Column({ nullable: false })
  city: string;
  @Field(() => String)
  @Column({ nullable: false })
  state: string;
  @Field(() => String)
  @Column({ nullable: false })
  email: string;
  @Field(() => String)
  @Column({ nullable: false })
  zipCode: string;
  @Field(() => String)
  @Column({ nullable: false })
  invoiceNumber: string;
  @Field(() => Boolean)
  @Column({ nullable: false, type: "boolean", default: false })
  isPaymentComplete: boolean;

  @Field(() => PaymentMethod)
  @Column({
    nullable: false,
    type: "enum",
    enum: PaymentMethod,
    default: PaymentMethod.ESEWA,
  })
  paymentMethod: PaymentMethod;
  @Field(() => Number)
  @Column({ nullable: false })
  totalAmount: number;
  @Field(() => Number)
  @Column({ nullable: false })
  totalDiscountAmount: number;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.bookings)
  ticket: Ticket;

  //   coupon: Coupon;
}
