import path from "path";
class PathUtil {
  static TEMP_FOLDER_PATH = path.resolve(process.cwd(), "temp");
  static UPLOADS_FOLDER_PATH = path.resolve(process.cwd(), "public", "uploads");

  static generateUserPath(id: string) {
    return path.join(this.UPLOADS_FOLDER_PATH, "user", id);
  }

  static generateOrganizerPath(proposalId: string) {
    return path.join(this.UPLOADS_FOLDER_PATH, "proposal", proposalId);
  }
}

export default PathUtil;
