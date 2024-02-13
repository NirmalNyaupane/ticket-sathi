import { registerEnumType } from "type-graphql";

enum OrganizerStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}

registerEnumType(OrganizerStatus, {
    name: "OrganizerStatus"
})

export { OrganizerStatus };