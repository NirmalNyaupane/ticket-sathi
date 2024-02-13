import { Field, ObjectType } from "type-graphql"

@ObjectType()
class CommonResponse {
    @Field(() => String)
    status: "error" | "success"

    @Field(() => String)
    message: string
}

export { CommonResponse };