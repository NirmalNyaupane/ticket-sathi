import fs from "fs";
import PathUtil from "./path.util";
import { MediaOf } from "../constants/enums/media.enum";
import { MediaMigratePayload } from "../types/media";
class MediaUtil {
  //migrate media from temp folder if everythings goes alrightssssss
  migrate(info: MediaMigratePayload) {
    switch (info.type) {
      case MediaOf.User:
        let userGeneratedPath = PathUtil.generateUserPath(info.userId);
        //create user folder if it is not created
        this.checkCreateDir(userGeneratedPath);
        //move file from temp to upload/user/:id/.document
        fs.renameSync(
          `${PathUtil.TEMP_FOLDER_PATH}/${info.mediaName}`,
          `${userGeneratedPath}/${info.mediaName}`
        );
        break;

      case MediaOf.Event:
        let eventGeneratedPath = PathUtil.generateEventPath(info.eventId);
        //create user folder if it is not created
        this.checkCreateDir(eventGeneratedPath);
        //move file from temp to upload/user/:id/.document
        fs.renameSync(
          `${PathUtil.TEMP_FOLDER_PATH}/${info.mediaName}`,
          `${eventGeneratedPath}/${info.mediaName}`
        );
        break;

      case MediaOf.Organizer:
        let organizerGeneratedPath = PathUtil.generateOrganizerPath(info.organizerDetailsId);
        //create user folder if it is not created
        this.checkCreateDir(organizerGeneratedPath);
        //move file from temp to upload/user/:id/.document
        fs.renameSync(
          `${PathUtil.TEMP_FOLDER_PATH}/${info.mediaName}`,
          `${organizerGeneratedPath}/${info.mediaName}`
        );
        break;
    }
  }

  deleteFile(path: string) {
    if (fs.existsSync(path)) {
      fs.unlink(path, () => {
        console.log("file deleted");
      });
    }
  }

  private checkCreateDir(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
      //enable all permission
      fs.chmodSync(path, 0o777);
    }
  }
}

export default new MediaUtil();
