import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { CommonResponse } from "../../schemas";
import { CouponValidator } from "../../validators/coupons/coupon.validator";
import authentication from "../../middlewares/authentication.middleware";
import { UserRole } from "../../constants/enums/auth.enum";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";

@Resolver()
export class CouponResolver {
  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication([UserRole.ORGANIZER]))
  @UseMiddleware(RequestValidator.validate(CouponValidator))
  async createCoupon(
    @Arg("data", () => CouponValidator) data: CouponValidator
  ) {}
}
