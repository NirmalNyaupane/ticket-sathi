import { registerEnumType } from "type-graphql"

enum AuthType {
    TRADITIONAL = "TRADITIONAL",
    GOOGLE = "GOOGLE",
    APPLE = "APPLE"
}

enum UserRole {
    USER = "USER",
    ORGANIZER = "ORGANIZER",
    ADMIN = "ADMIN"
}

registerEnumType(UserRole,{
    name:"UserRole"
})

registerEnumType(AuthType, {
    name: "AuthType"
})
export { AuthType, UserRole }