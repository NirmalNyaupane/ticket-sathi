import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Booking } from "../../entities/booking/booking.entity";
import authentication from "../../middlewares/authentication.middleware";
import { UserRole } from "../../constants/enums/auth.enum";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CreateBookingValidator } from "../../validators/booking/booking.validator";
import { Context } from "../../types/context.type";
import bookingService from "../../service/booking/booking.service";

@Resolver()
export class BookingResolver {
  @Mutation(() => Booking)
  @UseMiddleware(authentication([UserRole.USER]))
  @UseMiddleware(RequestValidator.validate(CreateBookingValidator))
  async createBooking(
    @Arg("data") data: CreateBookingValidator,
    @Ctx() context: Context
  ) {
    return await bookingService.createBooking(data, context.user!);
  }
}
