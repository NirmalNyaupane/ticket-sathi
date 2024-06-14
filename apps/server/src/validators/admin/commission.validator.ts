import { IsNotEmpty, IsNumber, Max } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateCommission{
    @Field(()=>Int)
    @IsNotEmpty()
    @IsNumber()
    @Max(50)
    commission:number;
}