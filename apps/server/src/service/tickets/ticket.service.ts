import { EventStatus } from "../../constants/enums/event.enum";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import { DiscountType, TicketStatus } from "../../constants/enums/ticket.enum";
import {
  InvalidException,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { Booking } from "../../entities/booking/booking.entity";
import { Category } from "../../entities/category/category.entity";
import { Event } from "../../entities/event/event.entity";
import { Ticket } from "../../entities/ticket/ticket.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
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

  async getBookedTicket(userId: UUID) {
    const res = await Booking.find({
      relations: {
        user: true,
        ticket: {
          event: true,
        },
      },
      where: {
        user: {
          id: userId,
        },
        isPaymentComplete: true,
      },
    });

    // console.log(userId);
    return res;
  }

  async getOrganizerSales(userId: UUID) {
    const res = await Booking.find({
      relations: {
        user: true,
        ticket: {
          event: true,
        },
      },
      where: {
        ticket: {
          event: {
            category: {
              organizer: {
                user: {
                  id: userId,
                },
              },
            },
          },
        },
        isPaymentComplete: true,
      },
    });

    console.log(res[0].ticket);
    return res;
  }

  async getOrganizerAnalytics(userId: UUID) {
    const totalCategory = await Category.count({
      where: {
        organizer: {
          user: {
            id: userId,
          },
        },
      },
    });

    const totalEvents = await Event.count({
      where: {
        category: {
          organizer: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    const totalActiveEvents = await Event.count({
      where: {
        status: EventStatus.APPROVED,
        category: {
          organizer: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    const totalRejectedEvents = await Event.count({
      where: {
        status: EventStatus.REJECTED,
        category: {
          organizer: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    const salesTicket = await Ticket.count({
      where: {
        bookings: {
          isPaymentComplete: true,
        },
        event: {
          category: {
            organizer: {
              user: {
                id: userId,
              },
            },
          },
        },
      },
    });

    const totalSales = await Booking.sum("totalAmount", {
      ticket: {
        event: {
          category: {
            organizer: {
              user: {
                id: userId,
              },
            },
          },
        },
      },
    });

    return {
      totalActiveEvents,
      totalCategory,
      totalEvents,
      totalRejectedEvents,
      totalSales,
      salesTicket,
    };
  }

  async getAdminAnalytics(userId: UUID) {
    const pendingOrganizers = await OrganizerDetails.count({
      where: {
        status: OrganizerStatus.PENDING,
        user: {
          isVerified: true,
        },
      },
    });

    const acceptedOrganziers = await OrganizerDetails.count({
      where: {
        status: OrganizerStatus.ACCEPTED,
        user: {
          isVerified: true,
        },
      },
    });

    const rejectedOrganizers = await OrganizerDetails.count({
      where: {
        status: OrganizerStatus.REJECTED,
        user: {
          isVerified: true,
        },
      },
    });
    const totalOrganizers = await OrganizerDetails.count({
      where: {
        user: {
          isVerified: true,
        },
      },
    });

    const totalActiveEvents = await Event.count({
      where: {
        status: EventStatus.APPROVED,
      },
    });

    const totalRejectedEvents = await Event.count({
      where: {
        status: EventStatus.REJECTED,
      },
    });

    const totalPendingEvents = await Event.count({
      where: {
        status: EventStatus.PENDING,
      },
    });

    const totalEvents = await Event.count();

    const totalSales = await Booking.sum("totalAmount", {
      isPaymentComplete: true,
    });

    return {
      totalActiveEvents,
      totalEvents,
      totalRejectedEvents,
      totalSales,
      totalPendingEvents,
      totalOrganizers,
      rejectedOrganizers,
      acceptedOrganziers,
      pendingOrganizers,
    };
  }
}
export default new TicketService();
