import { registerEnumType } from "type-graphql";

export enum MediaType {
  USER_PROFILE = "USER_PROFILE",
  ORGANIZER_DOCUMENT = "ORGANIZER_DOCUMENT",
}

export enum MediaOf {
  User = "USER",
  Organizer = "ORGANIZER",
  Event = "EVENT",
}

registerEnumType(MediaType, {
  name: "MediaType",
});
