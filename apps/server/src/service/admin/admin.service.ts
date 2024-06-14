import { UserRole } from "../../constants/enums/auth.enum";
import { EventStatus } from "../../constants/enums/event.enum";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import {
  InternalServerError,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { CommissionEntity } from "../../entities/commission/commission.entity";
import { Event } from "../../entities/event/event.entity";
import { Ticket } from "../../entities/ticket/ticket.entity";
import { EventRejectReasons } from "../../entities/user/eventRejectedReason.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
import { OrganizerRejectReasons } from "../../entities/user/organizerRejectReason.entity";
import { User } from "../../entities/user/user.entity";
import { CommonResponse } from "../../schemas";
import { CommonQuery } from "../../schemas/common/common.schema";
import { UUID } from "../../types/commontype";
import { MailType } from "../../utils/email.util";
import paginationUtil from "../../utils/pagination.util";
import QueueUtil from "../../utils/queue.util";
import {
  AdminEventValidator,
  AdminOrganizerValidator,
} from "../../validators/admin/adminOrganizer.validator";
import { CreateCommission } from "../../validators/admin/commission.validator";

class AdminService {
  async findAllOrganizer(query: CommonQuery) {
    const builder = OrganizerDetails.createQueryBuilder("organizer")
      .leftJoin("organizer.user", "user")
      .where("user.isVerified", {
        isVerified: true,
      });

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
      const user = await User.findOne({
        where: {
          organizerDetails: {
            id: data.organizerId,
          },
        },
      });
      if (response.status === OrganizerStatus.ACCEPTED) {
        QueueUtil.addEmailJob({
          to: user?.email!,
          mailType: MailType.CHANGE_STATUS,
          subject: "Your organizer account has been accepted",
          data: {
            name: user?.fullName,
            title:
              "Your account has been approved by admin. Now you can access full features of organizer dashboard",
          },
        });
      }
      if (response.status === OrganizerStatus.REJECTED) {
        QueueUtil.addEmailJob({
          to: user?.email!,
          mailType: MailType.CHANGE_STATUS,
          subject: "Your organizer account has been rejected",
          data: {
            name: user?.fullName,
            title: "Your account has been rejected by admin. ",
            message: data.reason,
          },
        });
      }
      return {
        message: "Updated sucessfully",
        status: "error",
      };
    } else {
      throw new InternalServerError();
    }
  }

  async findAllEvents(query: CommonQuery) {
    const builder = Event.createQueryBuilder("event");

    const { take, skip } = paginationUtil.skipTakeMaker({
      page: query.page,
      pageLimit: query.pageLimit,
    });

    builder.take(take);
    builder.skip(skip);
    if (query.search) {
      builder.andWhere("event.name ILIKE :name", {
        name: `%${query.search}%`,
      });
    }

    return await builder.getManyAndCount();
  }

  async getParticularEvent(eventId: UUID) {
    const event = await Event.findOne({
      where: {
        id: eventId,
      },
      relations: {
        images: true,
        cover: true,
        category: true,
        tickets: true,
      },
    });

    if (!event) {
      throw new NotFoundExceptions("event is not found with that id");
    }

    return event;
  }

  async updateEvent(input: AdminEventValidator) {
    const event = await this.getParticularEvent(input.eventId);
    if (input.rejectedReason) {
      const rejectedReason = await EventRejectReasons.findOne({
        where: {
          event: {
            id: input.eventId,
          },
        },
      });

      if (rejectedReason) {
        rejectedReason.reasons = input.rejectedReason;
        await rejectedReason.save();
      } else {
        const rejectedReason = new EventRejectReasons();
        rejectedReason.reasons = input.rejectedReason;
        rejectedReason.event = event;
        await rejectedReason.save();
      }
    }
    event.status = input.status;
    return await event.save();
  }

  async getEventTickets(ticketId: UUID) {
    const events = await Event.findOne({
      where: {
        id: ticketId,
      },
    });

    if (!events) {
      throw new NotFoundExceptions("Event is not found with that id");
    }

    return await Ticket.find({
      where: {
        event: {
          id: ticketId,
        },
      },
    });
  }

  private async findOrganzier(organizerId: UUID): Promise<OrganizerDetails> {
    const organizer = await OrganizerDetails.findOne({
      where: {
        id: organizerId,
        user: {
          isVerified: true,
        },
      },
    });
    console.log(organizer);
    if (!organizer) {
      throw new NotFoundExceptions("organizer is not found");
    }

    return organizer;
  }

  async creatCommission(data: CreateCommission): Promise<CommonResponse> {
    //check commission
    const commission = await CommissionEntity.find();
    if (commission && commission.length > 0) {
      await CommissionEntity.update(
        {
          id: commission[0].id,
        },
        {
          commission: data.commission,
        }
      );
      return {
        message: "Commission updated sucessfully",
        status: "success",
      };
    } else {
      await CommissionEntity.insert(data);
      return {
        message: "Commission insert successfully",
        status: "success",
      };
    }
  }

  async getCommission(): Promise<CommissionEntity[]> {
    return await CommissionEntity.find();
  }
}

export default new AdminService();
