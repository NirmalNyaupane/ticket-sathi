import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { CreateBookingValidator } from "../../validators/booking/booking.validator";
import { Ticket } from "../../entities/ticket/ticket.entity";
import {
  InvalidException,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { DiscountType, TicketStatus } from "../../constants/enums/ticket.enum";
import { Booking } from "../../entities/booking/booking.entity";
import { OtpGenerator } from "../../utils/helper";
import { User } from "../../entities/user/user.entity";

class BookingService {
  async createBooking(data: CreateBookingValidator, user: User) {
    //checks ticket is validate or not
    const ticket = await Ticket.findOne({
      where: {
        id: data.ticketId,
      },
    });

    if (!ticket) {
      throw new NotFoundExceptions("ticket is not found with that id");
    }

    //check ticket is invalid or not
    if (ticket.status === TicketStatus.INACTIVE) {
      throw new InvalidException("Ticket is not active");
    }

    if (!ticket.isUnlimited) {
      if (
        ticket.totalTicket === 0 ||
        ticket.totalTicket < data.ticketQuantity
      ) {
        throw new NotFoundExceptions("Ticket is not available");
      }
    }
    //total amount
    let totalAmount = ticket.price * data.ticketQuantity;

    //calculate the discount
    let discountAmount = 0;
    if (ticket.earlyBirdOffer) {
      if (new Date(ticket.discountEndDate) > new Date()) {
        //discount is available
        if (ticket.discountType === DiscountType.FLAT) {
          discountAmount = ticket.discount * data.ticketQuantity;
        } else if (ticket.discountType === DiscountType.PERCENTAGE) {
          discountAmount = (totalAmount * ticket.discount) / 100;
        }
      }
    }
    totalAmount = totalAmount - discountAmount;


    //check coupon 



    //create a booking 
    const booking = new Booking();
    booking.fullName = data.fullName;
    booking.address = data.address;
    booking.city = data.city;
    booking.state = data.state;
    booking.email = data.email;
    booking.zipCode = data.zipCode;
    booking.invoiceNumber = `${Ticket.name}-${new Date().getTime()}${OtpGenerator()}`;
    booking.paymentMethod = data.paymentMethod;
    booking.totalAmount = totalAmount;
    booking.totalDiscountAmount = discountAmount;

    booking.user = user;
    booking.ticket = ticket;

    const savedBooking =  await booking.save();
    console.log(savedBooking);
    return savedBooking;
  }
}

export default new BookingService();
