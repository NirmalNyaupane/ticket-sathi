import { MediaOf } from "../constants/enums/media.enum";
import { UUID } from "./commontype";
export type MediaMigratePayload = {
  mediaName: string;
} & (
  | {
      type: MediaOf.User;
      userId: UUID;
    }
  | {
      type: MediaOf.Organizer;
      organizerDetailsId: UUID;
    }
    |{
        type:MediaOf.Event, 
        eventId:UUID
    }
);
