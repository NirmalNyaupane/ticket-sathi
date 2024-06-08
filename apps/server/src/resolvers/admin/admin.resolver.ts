import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import authentication from "../../middlewares/authentication.middleware";
import { CommonResponse } from "../../schemas";
import {
    AdminOrganizerObject,
    PaginatedOrganizer,
} from "../../schemas/admin/admin.schema";
import { CommonQuery } from "../../schemas/common/common.schema";
import adminService from "../../service/admin/admin.service";
import paginationUtil from "../../utils/pagination.util";
import { AdminOrganizerValidator } from "../../validators/admin/adminOrganizer.validator";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

@Resolver()
export class AdminResolver {
  @Query(() => PaginatedOrganizer)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getAllOrganizer(@Arg("query", () => CommonQuery) query: CommonQuery) {
    const [organizer, count] = await adminService.findAllOrganizer(query);
    return {
      data: organizer,
      meta: paginationUtil.paginatedResponse(count, query),
    };
  }

  @Query(() => AdminOrganizerObject)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getSingleOrganizerDetails(@Arg("id", () => String) id: UUID) {
    return await adminService.getSpecificOrganizerDetails(id);
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async changeOrganizerStatus(@Arg("data") data: AdminOrganizerValidator) {
    return await adminService.changeOrganizerStatus(data);
  }
}
