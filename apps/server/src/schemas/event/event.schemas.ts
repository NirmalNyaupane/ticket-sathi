import { Field, InputType, ObjectType } from "type-graphql";
import { Event } from "../../entities/event/event.entity";
import PaginatedResponse, { CommonQuery } from "../common/common.schema";
import { EventStatus } from "../../constants/enums/event.enum";
import { IsEnum, IsOptional } from "class-validator";

@ObjectType()
export class PaginatedEventObject extends PaginatedResponse(Event) {}

@InputType()
export class GlobalEventFilter extends CommonQuery {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(EventStatus)
  status: EventStatus;
}
