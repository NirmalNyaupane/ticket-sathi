import { ObjectType } from "type-graphql";
import { Category } from "../../entities/category/category.entity";
import PaginatedResponse from "../common/common.schema";

@ObjectType()
export class PaginatedOrganizerCategory extends PaginatedResponse(Category) {}
