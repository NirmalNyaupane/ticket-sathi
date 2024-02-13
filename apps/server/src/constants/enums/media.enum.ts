import { registerEnumType } from "type-graphql";

export enum MediaType {
    USER_PROFILE = "USER_PROFILE",
    ORGANIZER_DOCUMENT = "ORGANIZER_DOCUMENT"
}

registerEnumType(MediaType, {
    name: "MediaType"
})