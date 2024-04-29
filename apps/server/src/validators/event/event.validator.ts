import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { EventType } from "../../constants/enums/event.enum";
import { IsEndDate, IsFutureDate } from "../customdecorator/validateDate";
type UUID = `${string}-${string}-${string}-${string}-${string}`;
@InputType()
export class CreateEventValidator {
  @Field(() => String)
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @Field(() => EventType)
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @Field(() => String)
  @IsNotEmpty()
  @Length(10, 200)
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsISO8601()
  @IsFutureDate()
  eventStartDate: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsISO8601()
  @IsEndDate("eventStartDate")
  eventEndDate: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  images: UUID[];

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  cover: UUID;

  @Field(() => String)
  @IsNotEmpty()
  @Length(2, 30)
  venue: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  categoryId: UUID;
}
