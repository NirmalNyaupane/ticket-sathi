import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import authentication from "../../middlewares/authentication.middleware";
import { UserResponse } from "../../schemas/user/user.schema";
import userService from "../../service/user/user.service";
import { Context } from "../../types/context.type";
import { CommonResponse } from "../../schemas";
import { UpdateUserValidation } from "../../validators/user/updateuser.validation";
import authService from "../../service/auth/auth.service";
import bcrypt from "bcrypt";
import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";

@Resolver()
class UserResolver {
  @Query(() => UserResponse)
  @UseMiddleware(authentication())
  async getCurrentUser(@Ctx() context: Context) {
    const user = context.user;
    return userService.getUserDetailsById(user?.id as string);
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication())
  async updateUser(
    @Arg("data") userData: UpdateUserValidation,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const updateData = {} as Omit<
      UpdateUserValidation,
      "oldPassword" | "newPassword"
    > & { password: string };
    // const updatedResponse = await userService.
    if (userData.oldPassword) {
      if (userData.oldPassword === userData.newPassword) {
        throw new CustomError(
          "Old password and new password cannot same",
          HTTPStatusCode.BAD_REQUEST
        );
      }
      const user = await authService.findTokenById(context.user?.id as string);
      const isPasswordCorrect = await bcrypt.compare(
        userData.oldPassword,
        user?.password as string
      );

      if (!isPasswordCorrect) {
        throw new CustomError(
          "Password is incorrect",
          HTTPStatusCode.BAD_REQUEST
        );
      }
      const hashedPassword = await bcrypt.hash(userData.newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedResponse = await userService.updateUserById(
      context.user?.id as string,
      updateData
    );
    if (updatedResponse.affected === 1) {
      return { message: "User updated sucessfully", status: "success" };
    }

    throw new CustomError(
      "Internal server error",
      HTTPStatusCode.INTERNAL_SERVER_ERROR
    );
  }
}
export default UserResolver;
