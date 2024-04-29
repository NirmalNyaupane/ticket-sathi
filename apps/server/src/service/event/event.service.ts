import { MediaType } from "../../constants/enums/media.enum";
import {
  InvalidException,
  NotFoundExceptions,
} from "../../constants/errors/exceptions.error";
import { Category } from "../../entities/category/category.entity";
import { Event } from "../../entities/event/event.entity";
import { CreateEventValidator } from "../../validators/event/event.validator";
import mediaService from "../media/media.service";
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
}

export default new EventService();
