import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import authentication from "../../middlewares/authentication.middleware";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CommonResponse } from "../../schemas";
import { PaginatedOrganizerCategory } from "../../schemas/category/category.schema";
import { CommonQuery } from "../../schemas/common/common.schema";
import categoryService from "../../service/category/category.service";
import { Context } from "../../types/context.type";
import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";
import paginationUtil from "../../utils/pagination.util";
import {
  CreateCategoryValidation,
  UpdateCategoryValidation,
} from "../../validators/category/category.validator";
type UUID = `${string}-${string}-${string}-${string}-${string}`;
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

  @Query(() => PaginatedOrganizerCategory)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async getMyCategory(
    @Arg("query", (type) => CommonQuery) query: CommonQuery,
    @Ctx() context: Context
  ): Promise<PaginatedOrganizerCategory> {
    const [category, count] = await categoryService.getOrganizerCategory(
      query,
      context.user?.id!
    );

    return {
      data: category,
      meta: paginationUtil.paginatedResponse(count, query),
    };
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async updateCategory(
    @Ctx() context: Context,
    @Arg("categoryId", () => String) categoryId: UUID,
    @Arg("data") updatedData: UpdateCategoryValidation
  ): Promise<CommonResponse> {
    const category = await categoryService.findOrganizerSingleCategory(
      categoryId,
      context.user?.id!
    );

    const response = await categoryService.updateCategoryById(
      category,
      updatedData
    );
    if (response.affected === 1) {
      return { message: "Category updated sucessfully", status: "success" };
    } else {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  //move category to trash
  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async moveCategoryTrash(
    @Arg("categoryId", () => String) categoryId: UUID,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const category = await categoryService.findOrganizerSingleCategory(
      categoryId,
      context.user?.id!
    );

    const response = await categoryService.moveCategoryTrash(category);

    if (response) {
      return {
        message: "Category moved in trash sucessfully",
        status: "success",
      };
    } else {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Query(() => PaginatedOrganizerCategory)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async getMyTrashedCategory(
    @Arg("query", (type) => CommonQuery) query: CommonQuery,
    @Ctx() context: Context
  ): Promise<PaginatedOrganizerCategory> {
    const [category, count] = await categoryService.getAllTrashedCategory(
      query,
      context.user?.id!
    );

    return {
      data: category,
      meta: paginationUtil.paginatedResponse(count, query),
    };
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async recoverFromTrash(
    @Arg("categoryId", () => String) categoryId: UUID,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const category = await categoryService.findTrashCategoryById(
      categoryId,
      context.user?.id!
    );
    const response = await categoryService.recoverTrashedCategory(category);
    if (response.affected === 1) {
      return { message: "Category recovered sucessfully", status: "success" };
    } else {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async deleteCategoryPermanent(
    @Arg("categoryId", () => String) categoryId: UUID,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const category = await categoryService.findTrashCategoryById(
      categoryId,
      context.user?.id!
    );

    const response = await categoryService.deleteCategoryPermanent(category);

    if (response) {
      return {
        message: "Category deleted sucessfully",
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
