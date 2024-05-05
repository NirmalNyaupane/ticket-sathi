import { MediaType } from "../../constants/enums/media.enum";
import {
  InvalidException,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { Category } from "../../entities/category/category.entity";
import { Event } from "../../entities/event/event.entity";
import { CreateEventValidator } from "../../validators/event/event.validator";
import mediaService from "../media/media.service";
import { CommonQuery } from "../../schemas/common/common.schema";
import paginationUtil from "../../utils/pagination.util";
import { UUID } from "../../types/commontype";
class EventService {
  async createEvent(category: Category, data: CreateEventValidator) {
    const event = new Event();
    event.name = data.name;
    event.description = data.description;
    event.type = data.type;
    event.eventStartDate = data.eventStartDate;
    event.eventEndDate = data.eventEndDate;
    event.venue = data.venue;
    event.category = category;

    //validate cover
    const cover = await mediaService.findMediaById(data.cover);
    if (!cover) {
      throw new NotFoundExceptions("cover");
    } else {
      if (cover.mediaType !== MediaType.EVENT_COVER) {
        throw new InvalidException(`images must be ${MediaType.EVENT_COVER}`);
      }
    }

    event.cover = cover;

    //validate images
    const images = await mediaService.findMultipleMediabyIds(data.images);
    if (images && images?.length > 0) {
      for (let image of images) {
        if (!image) {
          throw new InvalidException(
            "One or more than one media ids are invalid"
          );
        }
        if (image?.mediaType !== MediaType.EVENT_IMAGE) {
          throw new InvalidException(`images must be ${MediaType.EVENT_IMAGE}`);
        }
      }
    }

    //@ts-ignore
    event.images = images;

    return await event.save();
  }

  async getMyEvents(organizerId: UUID, query: CommonQuery) {
    const builder = Event.createQueryBuilder("event")
      .leftJoin("event.category", "category")
      .leftJoin("category.organizer", "organizer")
      .leftJoin("organizer.user", "user")
      .leftJoinAndSelect("event.cover", "cover")
      .leftJoinAndSelect("event.images", "images")
      .where("user.id=:id", {
        id: organizerId,
      });

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

  async getTicketByOrganizerId(organizerId: UUID) {
    const event = await Event.findOne({
      where: {
        category: {
          organizer: {
            user: {
              id: organizerId,
            },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundExceptions(
        "Event is not found or it is not belongs to this organizer"
      );
    }

    return event;
  }
}

export default new EventService();
