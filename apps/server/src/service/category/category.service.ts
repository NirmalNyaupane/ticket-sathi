import { IsNull, Not } from "typeorm";
import { Category } from "../../entities/category/category.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
import { User } from "../../entities/user/user.entity";
import { CommonQuery } from "../../schemas/common/common.schema";
import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";
import paginationUtil from "../../utils/pagination.util";
import {
  CreateCategoryValidation,
  UpdateCategoryValidation,
} from "../../validators/category/category.validator";
import { UUID } from "../../types/commontype";

class CategoryService {
  //return the category by category id
  async findCategoryById(id: UUID): Promise<Category> {
    const category = await Category.findOneBy({ id });

    if (!category) {
      throw new CustomError(
        "Category is not found",
        HTTPStatusCode.BAD_REQUEST
      );
    }

    return category;
  }

  //find category by id with organizer id
  async findOrganizerSingleCategory(categoryId: UUID, organizerId: UUID) {
    const category = await Category.findOne({
      where: {
        id: categoryId,
        organizer: {
          user: {
            id: organizerId,
          },
        },
      },
    });

    if (!category) {
      throw new CustomError(
        "Category is not found or not belogs to you",
        HTTPStatusCode.BAD_REQUEST
      );
    }

    return category;
  }

  async createCategory(
    data: CreateCategoryValidation,
    user: User
  ): Promise<Category> {
    //find the organizer
    const organizer = await OrganizerDetails.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const category = new Category();
    category.name = data.name;
    category.description = data.description;
    category.organizer = organizer!;
    return await category.save();
  }

  //return all categories of an organizer
  async getOrganizerCategory(query: CommonQuery, organizerId: string) {
    const builder = Category.createQueryBuilder("category")
      .leftJoin("category.organizer", "organizer")
      .leftJoin("organizer.user", "user")
      .where("user.id=:id", {
        id: organizerId,
      });

    const { take, skip } = paginationUtil.skipTakeMaker({
      page: query.page,
      pageLimit: query.pageLimit,
    });

    builder.take(take);
    builder.skip(skip);
    if (query.search) {
      builder.andWhere("category.name ILIKE :name", {
        name: `%${query.search}%`,
      });
    }

    return await builder.getManyAndCount();
  }

  //update category by category id
  async updateCategoryById(
    category: Category,
    updateData: UpdateCategoryValidation
  ) {
    return await Category.update({ id: category.id }, updateData);
  }

  //move the items in trash
  async moveCategoryTrash(category: Category) {
    return await Category.softRemove(category);
  }

  //delete category permanently
  async deleteCategoryPermanent(category: Category) {
    return await category.remove();
  }

  //get trashed items
  async findTrashCategoryById(categoryId: UUID, organizerId: UUID) {
    const category = await Category.findOne({
      withDeleted: true,
      where: {
        id: categoryId,
        organizer: {
          user: {
            id: organizerId,
          },
        },
        deletedAt: Not(IsNull()),
      },
    });

    if (!category) {
      throw new CustomError(
        "Category is not found or not belogs to you or It is not in trash",
        HTTPStatusCode.BAD_REQUEST
      );
    }

    return category;
  }

  async getAllTrashedCategory(query: CommonQuery, organizerId: string) {
    const builder = Category.createQueryBuilder("category")
      .leftJoin("category.organizer", "organizer")
      .leftJoin("organizer.user", "user")
      .withDeleted()
      .where("user.id=:id", {
        id: organizerId,
      })
      .andWhere("category.deletedAt is distinct from :date", { date: null });
    const { take, skip } = paginationUtil.skipTakeMaker({
      page: query.page,
      pageLimit: query.pageLimit,
    });

    builder.take(take);
    builder.skip(skip);
    if (query.search) {
      builder.andWhere("category.name ILIKE :name", {
        name: `%${query.search}%`,
      });
    }

    return await builder.getManyAndCount();
  }

  async recoverTrashedCategory(category: Category) {
    return await Category.createQueryBuilder("category")
      .restore()
      .where("category.id=:id", { id: category.id })
      .execute();
  }
}

export default new CategoryService();
