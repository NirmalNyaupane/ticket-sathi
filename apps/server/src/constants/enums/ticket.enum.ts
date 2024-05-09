import { registerEnumType } from "type-graphql";

export enum DiscountType{
    FLAT="FLAT",
    PERCENTAGE="PERCENTAGE"
}

registerEnumType(DiscountType,{
    name:"DiscountType",
    description:"This is a enum that provide discount type"
})