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
import { PaginatedEventObject } from "../../schemas/event/event.schemas";
import { Event } from "../../entities/event/event.entity";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
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
  @UseMiddleware(RequestValidator.validate(AdminOrganizerObject))
  async changeOrganizerStatus(@Arg("data") data: AdminOrganizerValidator) {
    return await adminService.changeOrganizerStatus(data);
  }

  @Query(() => PaginatedEventObject)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getAllEvents(@Arg("query", () => CommonQuery) query: CommonQuery) {
    const [events, count] = await adminService.findAllEvents(query);
    return {
      data: events,
      meta: paginationUtil.paginatedResponse(count, query),
    };
  }

  @Query(() => Event)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getParticularEventForAdmin(
    @Arg("eventId", () => String) eventId: UUID
  ) {
    return await adminService.getParticularEvent(eventId);
  }

  @Query(() => Event)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getTicketForParticularEventForAdmin(
    @Arg("eventId", () => String) eventId: UUID
  ) {
    return await adminService.getEventTickets(eventId);
  }

}
