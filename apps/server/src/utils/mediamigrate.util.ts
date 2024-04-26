import fs from "fs";
import PathUtil from "./path.util";
import { MediaOf } from "../constants/enums/media.enum";
import { MediaMigratePayload } from "../types/media";
class MediaUtil {
  //migrate
  migrate(info: MediaMigratePayload) {
    switch (info.type) {
      case MediaOf.User:
        let userGeneratedPath = PathUtil.generateUserPath(info.userId);

        //create proposal folder if it is not creted
        this.checkCreateDir(userGeneratedPath);
        //move file from temp to upload/proposal/:id/.document
        fs.renameSync(
          `${PathUtil.TEMP_FOLDER_PATH}/${info.mediaName}`,
          `${userGeneratedPath}/${info.mediaName}`
        );
        break;
    }
  }

  async deleteFile(path: string) {
    if (fs.existsSync(path)) {
      await fs.unlink(path, () => {
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
