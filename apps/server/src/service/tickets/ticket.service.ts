import { DiscountType } from "../../constants/enums/ticket.enum";
import { InvalidException } from "../../constants/errors/exceptions.error";
import { Event } from "../../entities/event/event.entity";
import { Ticket } from "../../entities/ticket/ticket.entity";
import { UUID } from "../../types/commontype";
import { CreateTicketValidator } from "../../validators/tickets/createticket.validator";

class TicketService {
  async createTicket(event: Event, data: CreateTicketValidator) {
    const ticket = new Ticket();
    ticket.name = data.name;
    //perform validation for isUnlimited
    if (data.isUnlimited) {
      if (data.totalTicket) {
        throw new InvalidException("isUnlimited:true cannot have totalTicket");
      }
      ticket.isUnlimited = data.isUnlimited;
    } else {
      ticket.totalTicket = data.totalTicket;
    }
    //perform validation for early bird offer
    if (data.earlyBirdOffer) {
      ticket.earlyBirdOffer = data.earlyBirdOffer;

      if (
        data.discountType === DiscountType.PERCENTAGE &&
        data.discount > 100
      ) {
        throw new InvalidException(
          "Discount must be less than 100 as it indicates percentage"
        );
      }
      ticket.discount = data.discount;
      ticket.discountEndDate = data.discountEndDate;
    }
    ticket.price = data.price;
    ticket.discountType = data.discountType;
    ticket.event = event;

    return ticket.save();
  }

  async getAllTicketsOfEvent(eventId: UUID) {
    const tickets = await Ticket.find({
      where: {
        event: {
          id: eventId,
        },
      },
    });

    return tickets;
  }
}
export default new TicketService();
