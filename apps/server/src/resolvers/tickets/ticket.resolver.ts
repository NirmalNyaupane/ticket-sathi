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
import { Ticket } from "../../entities/ticket/ticket.entity";
import authentication from "../../middlewares/authentication.middleware";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CommonResponse } from "../../schemas";
import eventService from "../../service/event/event.service";
import ticketService from "../../service/tickets/ticket.service";
import { Context } from "../../types/context.type";
import { CreateTicketValidator } from "../../validators/tickets/createticket.validator";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

@Resolver()
export class TicketResolver {
  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  @UseMiddleware(RequestValidator.validate(CreateTicketValidator))
  async createTicket(
    @Arg("data") data: CreateTicketValidator,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const event = await eventService.getEventByOrganizerId(context.user?.id!);
    const response = await ticketService.createTicket(event, data);
    if (response) {
      return {
        message: "Ticket is created",
        status: "success",
      };
    } else {
      throw new InternalServerError();
    }
  }

  @Query(() => [Ticket])
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  async viewEventsTicket(@Arg("eventId", () => String) eventId: UUID, @Ctx() context:Context) {
    const event = await eventService.getEventByEventOrganizerId(context.user?.id!, eventId);
    return await ticketService.getAllTicketsOfEvent(event.id);
  }
  updateTicket() {}
  deleteTicket() {}
}
