import { registerEnumType } from "type-graphql";

export enum DiscountType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
}

export enum TicketStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

registerEnumType(DiscountType, {
  name: "DiscountType",
  description: "This is an enum that provide discount type",
});

registerEnumType(TicketStatus, {
  name: "TicketStatus",
  description: "This is an enum that defines ticket status",
});
