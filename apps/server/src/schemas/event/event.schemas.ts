import { ObjectType } from "type-graphql";
import { Event } from "../../entities/event/event.entity";
import PaginatedResponse from "../common/common.schema";

@ObjectType()
export class PaginatedEventObject extends PaginatedResponse(Event) {}

