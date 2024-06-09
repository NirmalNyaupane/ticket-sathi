import path from "path";
import { EnvConfiguration } from "../config/env.config";
class PathUtil {
  static TEMP_FOLDER_PATH = path.join(
    process.cwd(),
    EnvConfiguration.MEDIA_TEMP_PATH!
  );
  static UPLOADS_FOLDER_PATH = path.join(
    process.cwd(),
    EnvConfiguration.MEDIA_UPLOAD_PATH!
  );

  static generateUserPath(id: string) {
    return path.join(this.UPLOADS_FOLDER_PATH, "user", id);
  }

  static generateOrganizerPath(organizerId: string) {
    return path.join(this.UPLOADS_FOLDER_PATH, "organizer", organizerId);
  }

  static generateEventPath(proposalId: string) {
    return path.join(this.UPLOADS_FOLDER_PATH, "event", proposalId);
  }
}

export default PathUtil;
