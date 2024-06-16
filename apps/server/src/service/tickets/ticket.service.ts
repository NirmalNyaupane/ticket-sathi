import { DiscountType, TicketStatus } from "../../constants/enums/ticket.enum";
import {
  InvalidException,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { Event } from "../../entities/event/event.entity";
import { Ticket } from "../../entities/ticket/ticket.entity";
import { UUID } from "../../types/commontype";
import {
  CreateTicketValidator,
  UpdateTicketValidator,
} from "../../validators/tickets/createticket.validator";
import eventService from "../event/event.service";

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

    if (data.earlyBirdOffer) {
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

  async getTicketsByOrganizerandId(organizerId: UUID, ticketId: UUID) {
    const ticket = await Ticket.findOne({
      where: {
        id: ticketId,
        event: {
          category: {
            organizer: {
              user: {
                id: organizerId,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new InvalidException(
        "Ticket is not found or it is not belongs to this organizer"
      );
    }
    return ticket;
  }

  async updateTicket(ticket: Ticket, updateData: UpdateTicketValidator) {
    return await Ticket.update({ id: ticket.id }, updateData);
  }

  async deleteTicket(ticket: Ticket) {
    return await ticket.remove();
  }

  async getTicketByEventId(eventId: UUID) {
    await eventService.getSingleEvent(eventId);
    return await Ticket.find({
      where: {
        status: TicketStatus.ACTIVE,
        event: {
          id: eventId,
        },
      },
    });
  }

  async getTicketById(id: UUID) {
    const ticket = await Ticket.findOne({
      where: {
        id,
      },
    });

    if (!ticket) {
      throw new InvalidException("ticket is not found");
    }

    return ticket;
  }
}
export default new TicketService();
