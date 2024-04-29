import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import { InternalServerError } from "../../constants/errors/exceptions.error";
import authentication from "../../middlewares/authentication.middleware";
import { CommonResponse } from "../../schemas";
import categoryService from "../../service/category/category.service";
import eventService from "../../service/event/event.service";
import { Context } from "../../types/context.type";
import { CreateEventValidator } from "../../validators/event/event.validator";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";

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
}
