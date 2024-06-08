import { ObjectType } from "type-graphql";
import PaginatedResponse from "../common/common.schema";
import { User } from "../../entities/user/user.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";

@ObjectType()
export class PaginatedOrganizer extends PaginatedResponse(OrganizerDetails) {}

@ObjectType()
export class AdminOrganizerObject extends User{};