import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import { InternalServerError } from "../../constants/errors/exceptions.error";
import { Event } from "../../entities/event/event.entity";
import authentication from "../../middlewares/authentication.middleware";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CommonResponse } from "../../schemas";
import { CommonQuery } from "../../schemas/common/common.schema";
import { PaginatedEventObject } from "../../schemas/event/event.schemas";
import categoryService from "../../service/category/category.service";
import eventService from "../../service/event/event.service";
import { Context } from "../../types/context.type";
import paginationUtil from "../../utils/pagination.util";
import { CreateEventValidator } from "../../validators/event/event.validator";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

@Resolver()
export class EventResolver {
  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  @UseMiddleware(RequestValidator.validate(CreateEventValidator))
  async createEvent(
    @Arg("data") data: CreateEventValidator,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const category = await categoryService.findOrganizerSingleCategory(
      data.categoryId,
      context.user?.id!
    );
    const response = await eventService.createEvent(category, data);
    if (response) {
      return { message: "Category created sucessfully", status: "success" };
    } else {
      throw new InternalServerError();
    }
  }

  @Query(() => PaginatedEventObject)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async getMyEvents(@Ctx() context: Context, @Arg("query") query: CommonQuery) {
    const [event, count] = await eventService.getMyEvents(
      context.user?.id!,
      query
    );
    return {
      data: event,
      meta: paginationUtil.paginatedResponse(count, query),
    };
  }

  @Query(() => Event, { description: "Open" })
  async getSingleEvent(@Arg("eventId", () => String) eventId: UUID) {
    return await eventService.getSingleEvent(eventId);
  }
}
