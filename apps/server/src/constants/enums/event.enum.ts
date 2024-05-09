import { registerEnumType } from "type-graphql";

export enum EventType {
  THEATER = "THEATER",
  VIRTUAL = "VIRTUAL",
  CONCERT = "CONCERT",
}

export enum EventStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

registerEnumType(EventType, {
  name: "EventType",
  description: "Defines type of enum",
});

registerEnumType(EventStatus, {
  name: "EventStatus",
  description: "Defines status of event",
});
