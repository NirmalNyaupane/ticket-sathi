import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { CommonResponse } from "../../schemas";
import authentication from "../../middlewares/authentication.middleware";
import { UserRole } from "../../constants/enums/auth.enum";
import { CreateCategoryValidation } from "../../validators/category/category.validator";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { Context } from "../../types/context.type";
import categoryService from "../../service/category/category.service";
import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";

@Resolver()
export class CategoryResolver {
  @Mutation(() => CommonResponse, { description: "Role: Organizer" })
  @UseMiddleware(RequestValidator.validate(CreateCategoryValidation))
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async createCategory(
    @Arg("data") data: CreateCategoryValidation,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    if (!context.user) {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
    const category = await categoryService.createCategory(data, context.user);
    if (category) {
      return {
        message: "Category created",
        status: "success",
      };
    } else {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
