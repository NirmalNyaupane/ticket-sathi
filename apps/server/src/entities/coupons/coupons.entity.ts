import { ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { CouponStatus, CouponType } from "../../constants/enums/coupon.enum";
import { CommonEntity } from "../common/common.entity";
import { Ticket } from "../ticket/ticket.entity";

@Entity()
@ObjectType()
export class Coupon extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: "enum", enum: CouponType })
  type: CouponType;

  @Column({ nullable: true, type: "int" })
  totalCoupons: number;

  @Column({ type: "boolean", default: false })
  isUnlimited: boolean;

  @Column({ type: "timestamp", nullable: false })
  expires: Date;

  @Column({ type: "enum", enum: CouponStatus })
  status: CouponStatus;

  @OneToMany(() => Ticket, (ticket) => ticket.coupons)
  ticket: Ticket;
}
