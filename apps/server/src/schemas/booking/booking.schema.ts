import { Field, InputType, ObjectType } from "type-graphql";
import { Booking } from "../../entities/booking/booking.entity";
import { User } from "../../entities/user/user.entity";
import { Ticket } from "../../entities/ticket/ticket.entity";
import { Event } from "../../entities/event/event.entity";
@ObjectType()
export class EsewaPayload {
  @Field(() => String)
  amount: string;
  @Field(() => String)
  failure_url: string;
  @Field(() => String)
  product_delivery_charge: string;
  @Field(() => String)
  product_service_charge: string;

  @Field(() => String)
  product_code: string;
  @Field(() => String)
  signature: string;
  @Field(() => String)
  signed_field_names: string;
  @Field(() => String)
  success_url: string;
  @Field(() => String)
  tax_amount: string;
  @Field(() => String)
  total_amount: string;
  @Field(() => String)
  transaction_uuid: string;
}
@ObjectType()
export class BookingObjectType {
  @Field(() => Booking)
  booking: Booking;

  @Field(() => EsewaPayload)
  esewaPayload: EsewaPayload;
}

@ObjectType()
export class TicketBookedObject extends Ticket {
  @Field(() => Event, { nullable: true })
  event: Event;
}

@ObjectType()
export class BookedUser extends User {}

@ObjectType()
export class UserTicket extends Booking {
  @Field(() => BookedUser, { nullable: true })
  user: BookedUser;

  @Field(() =>TicketBookedObject, { nullable: true })
  ticket: TicketBookedObject;
}

@ObjectType()
export class OrganzierAnalytics{
  @Field(()=>Number)
  totalActiveEvents:number;

  @Field(()=>Number)
  totalCategory:number;

  @Field(()=>Number)
  totalEvents:number;

  @Field(()=>Number)
  totalRejectedEvents:number;
  
  @Field(()=>Number)
  totalSales:number;

  @Field(()=>Number)
  salesTicket:number;
}


@ObjectType()
export class AdminAnalytics{
  @Field(()=>Number)
  totalActiveEvents:number;

  @Field(()=>Number)
  totalEvents:number;

  @Field(()=>Number)
  totalRejectedEvents:number;

  @Field(()=>Number)
  totalSales:number;

  @Field(()=>Number)
  totalPendingEvents:number;

  @Field(()=>Number)
  totalOrganizers:number;

  @Field(()=>Number)
  rejectedOrganizers:number;

  @Field(()=>Number)
  acceptedOrganziers:number;

  @Field(()=>Number)
  pendingOrganizers:number;
}