import { Request, Response, NextFunction, json } from "express";
import { createEsewaSignature } from "../utils/helper";
import { Booking } from "../entities/booking/booking.entity";
import { Ticket } from "../entities/ticket/ticket.entity";
class PaymentSuccess {
  async changePaymentStatus(req: Request, res: Response, next: NextFunction) {
    const { data } = req.query;

    if (!data) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );

    if (decodedData?.status !== "COMPLETE") {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    const bookingId = decodedData?.transaction_uuid;

    const response = await Booking.update(
      {
        id: bookingId,
      },
      {
        isPaymentComplete: true,
      }
    );

    const booking = await Booking.findOne({
      where: {
        id: bookingId,
      },
    });

    const ticket = await Ticket.findOne({
      where: {
        bookings: {
          id: bookingId,
        },
      },
    });

    if (!ticket?.isUnlimited) {
      if (ticket?.totalTicket && booking?.quantity) {
        const tt = ticket.totalTicket - Number(booking.quantity);
        await Ticket.update(
          {
            id: bookingId,
          },
          {
            totalTicket: tt,
          }
        );
      }
    }

    if (response.affected === 1) {
      return res.status(200).json({
        message: "success",
      });
    }
  }
}

export default new PaymentSuccess();
