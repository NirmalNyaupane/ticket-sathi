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
import {
  AdminEventValidator,
  AdminOrganizerValidator,
} from "../../validators/admin/adminOrganizer.validator";
import { PaginatedEventObject } from "../../schemas/event/event.schemas";
import { Event } from "../../entities/event/event.entity";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CreateCommission } from "../../validators/admin/commission.validator";
import { CommissionEntity } from "../../entities/commission/commission.entity";
import { InternalServerError } from "../../constants/errors/exceptions.error";
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

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async updateEventStatusByAdmin(
    @Arg("data") data: AdminEventValidator
  ): Promise<CommonResponse> {
    const response = await adminService.updateEvent(data);

    if (response) {
      return {
        message: "Status updated sucessfully",
        status: "error",
      };
    }
    throw new InternalServerError();
  }

  @Query(() => Event)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getTicketForParticularEventForAdmin(
    @Arg("eventId", () => String) eventId: UUID
  ) {
    return await adminService.getEventTickets(eventId);
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async createUpdateCommission(@Arg("data") data: CreateCommission) {
    return await adminService.creatCommission(data);
  }

  @Query(() => [CommissionEntity])
  @UseMiddleware(authentication([UserRole.ADMIN]))
  async getCommission() {
    return await adminService.getCommission();
  }
}
