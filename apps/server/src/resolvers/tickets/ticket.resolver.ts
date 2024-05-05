import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { UserRole } from "../../constants/enums/auth.enum";
import { InternalServerError } from "../../constants/errors/exceptions.error";
import authentication from "../../middlewares/authentication.middleware";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CommonResponse } from "../../schemas";
import eventService from "../../service/event/event.service";
import { Context } from "../../types/context.type";
import { CreateTicketValidator } from "../../validators/tickets/createticket.validator";
import ticketService from "../../service/tickets/ticket.service";

@Resolver()
export class TicketResolver {
  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  @UseMiddleware(RequestValidator.validate(CreateTicketValidator))
  async createTicket(
    @Arg("data") data: CreateTicketValidator,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const event = await eventService.getTicketByOrganizerId(context.user?.id!);
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
  viewEventsTicket() {}
  updateTicket() {}
  deleteTicket() {}
}
