import { InputType, Field, Int, ObjectType, ClassType } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 15 })
  pageLimit: number;
}

@ObjectType()
export class Pagination {
  @Field(() => Int)
  currentPage: number;
  @Field(() => Int)
  lastPage: number;
  @Field(() => Int, { nullable: true })
  nextPage: number | null;
  @Field(() => Int, { nullable: true })
  prevPage: number | null;
  @Field(() => Int)
  totalCount: number;
}

export default function PaginatedResponse<Result extends object>(
  ResultClass: ClassType<Result>
) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    // Runtime argument
    @Field((type) => [ResultClass])
    // Generic type
    data: Result[];

    @Field(() => Pagination)
    meta: Pagination;
  }
  return PaginatedResponseClass;
}

@InputType()
export class CommonQuery extends PaginationInput {
  @Field(() => String, { nullable: true })
  search?: string;
}
