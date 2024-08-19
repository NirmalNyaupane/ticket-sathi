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
import {
  BookingObjectType,
  EsewaPayload,
} from "../../schemas/booking/booking.schema";
import crypto from "crypto";
import { EnvConfiguration } from "../../config/env.config";

class BookingService {
  async createBooking(
    data: CreateBookingValidator,
    user: User
  ): Promise<BookingObjectType> {
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

    //create a booking
    const booking = new Booking();
    booking.fullName = data.fullName;
    booking.address = data.address;
    booking.city = data.city;
    booking.state = data.state;
    booking.email = data.email;
    booking.zipCode = data.zipCode;
    booking.invoiceNumber = `${
      Ticket.name
    }-${new Date().getTime()}${OtpGenerator()}`;
    booking.paymentMethod = data.paymentMethod;
    booking.totalAmount = totalAmount;
    booking.totalDiscountAmount = discountAmount;

    booking.user = user;
    booking.ticket = ticket;
    booking.country = data.country;
    booking.quantity = data.ticketQuantity.toString();
    const savedBooking = await booking.save();

    const amount = totalAmount + discountAmount || 0;
    const tax = amount * 0.1;
    const totalReceivableAmount = amount + tax - discountAmount;

    const signature = this.createSignature(
      `total_amount=${totalReceivableAmount},transaction_uuid=${booking.id},product_code=EPAYTEST`
    );

    const formData: EsewaPayload = {
      amount: amount.toString(),
      failure_url: `${EnvConfiguration.FRONTEND_URL}/payment/failure`,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: `${EnvConfiguration.FRONTEND_URL}/payment/success`,
      tax_amount: tax.toString(),
      total_amount: totalReceivableAmount.toString(),
      transaction_uuid: booking.id,
    };
    return {
      esewaPayload: formData,
      booking: savedBooking,
    };
  }

  createSignature(message: string) {
    console.log(message);
    const secret = "8gBm/:&EnhH.1/q";

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);

    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
  }
}

export default new BookingService();
