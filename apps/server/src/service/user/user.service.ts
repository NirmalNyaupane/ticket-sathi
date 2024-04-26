import { Media } from "../../entities/media/media.entity";
import { User } from "../../entities/user/user.entity";

class UserService {
  async updateUserById(id: string, data: Partial<User>) {
    console.log(id);
    return await User.update(id, { ...data });
  }

  async findUserById(id: string) {
    return await User.findOne({
      where: {
        id,
      },
    });
  }

  async getUserDetailsById(id: string) {
    return await User.findOne({
      relations: ["organizerDetails", "organizerDocuments", "profile"],
      where: {
        id,
      },
    });
  }

  async findRefreshToken(id: string) {
    return await User.findOne({
      where: {
        id,
      },
      select: ["refreshToken", "id", "email", "role"],
    });
  }

  async updateProfilePic(user: User, media: Media) {
    user.profile = media;
    return await user.save();
  }
}

export default new UserService();
