import { UserRole } from "../../constants/enums/auth.enum";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import {
  InternalServerError,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
import { OrganizerRejectReasons } from "../../entities/user/organizerRejectReason.entity";
import { User } from "../../entities/user/user.entity";
import { CommonResponse } from "../../schemas";
import { CommonQuery } from "../../schemas/common/common.schema";
import { UUID } from "../../types/commontype";
import paginationUtil from "../../utils/pagination.util";
import { AdminOrganizerValidator } from "../../validators/admin/adminOrganizer.validator";

class AdminService {
  async findAllOrganizer(query: CommonQuery) {
    const builder = OrganizerDetails.createQueryBuilder("organizer").leftJoin(
      "organizer.user",
      "user"
    );

    const { take, skip } = paginationUtil.skipTakeMaker({
      page: query.page,
      pageLimit: query.pageLimit,
    });

    builder.take(take);
    builder.skip(skip);
    if (query.search) {
      builder.andWhere("user.name ILIKE :name", {
        name: `%${query.search}%`,
      });
      builder.orWhere("organizer.organizerName ILIKE :organizerName", {
        organizerName: `%${query.search}%`,
      });
    }

    return await builder.getManyAndCount();
  }

  async getSpecificOrganizerDetails(id: UUID) {
    const organizer = await User.findOne({
      where: {
        role: UserRole.ORGANIZER,
        organizerDetails: {
          id,
        },
      },
      relations: {
        profile: true,
        organizerDetails: true,
        organizerDocuments: {
          logo: true,
          documents: true,
        },
      },
    });

    if (!organizer) {
      throw new NotFoundExceptions("Organzier is not found with that id");
    }
    return organizer;
  }

  async changeOrganizerStatus(
    data: AdminOrganizerValidator
  ): Promise<CommonResponse> {
    const organizer = await this.findOrganzier(data.organizerId);

    if (data.status === OrganizerStatus.REJECTED) {
      const reason = new OrganizerRejectReasons();
      reason.organizer = organizer;
      reason.reasons = data.reason;
    }
    //@ts-ignore
    organizer.status = data.status;

    const response = await organizer.save();
    if (response) {
      return {
        message: "Updated sucessfully",
        status: "error",
      };
    } else {
      throw new InternalServerError();
    }
  }
  private async findOrganzier(organizerId: string): Promise<OrganizerDetails> {
    const organizer = await OrganizerDetails.findOne({
      //@ts-ignore
      where: {
        id: organizerId,
        user: {
          isVerified: true,
        },
      },
    });

    if (!organizer) {
      throw new NotFoundExceptions("organizer is not found");
    }

    return organizer;
  }
}

export default new AdminService();
