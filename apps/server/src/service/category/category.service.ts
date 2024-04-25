import { Category } from "../../entities/category/category.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
import { User } from "../../entities/user/user.entity";
import { CreateCategoryValidation } from "../../validators/category/category.validator";

class CategoryService {
//   async findCategoryById() {
//     const category = await Category.
//   }

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
}

export default new CategoryService();
