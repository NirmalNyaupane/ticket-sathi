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
import {
  UpdateProfilePic,
  UpdateUserValidation,
} from "../../validators/user/updateuser.validation";
import authService from "../../service/auth/auth.service";
import bcrypt from "bcrypt";
import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import mediaService from "../../service/media/media.service";
import mediamigrateUtil from "../../utils/mediamigrate.util";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

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
    let { oldPassword, newPassword, ...restData } = userData;
    // const updatedResponse = await userService.
    if (oldPassword) {
      if (oldPassword === newPassword) {
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

      newPassword = await bcrypt.hash(userData.newPassword, 10);
    }

    const updatedResponse = await userService.updateUserById(
      context.user?.id as string,
      { ...restData, password: newPassword }
    );
    if (updatedResponse.affected === 1) {
      return { message: "User updated sucessfully", status: "success" };
    }

    throw new CustomError(
      "Internal server error",
      HTTPStatusCode.INTERNAL_SERVER_ERROR
    );
  }

  @Mutation(() => CommonResponse)
  @UseMiddleware(authentication())
  @UseMiddleware(RequestValidator.validate(UpdateProfilePic))
  async updateProfilePic(
    @Arg("data") data: UpdateProfilePic,
    @Ctx() context: Context
  ): Promise<CommonResponse> {
    const media = await mediaService.findMediaById(data.mediaId);
    const response = await userService.updateProfilePic(context.user!, media);

    if (response) {
      mediamigrateUtil.migrate({
        //@ts-ignore
        userId:context.user?.id, 
        mediaName:response.profile.name, 
      })
      return { message: "Update user sucessfully", status: "success" };
    } else {
      throw new CustomError(
        "Internal server error",
        HTTPStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
export default UserResolver;
