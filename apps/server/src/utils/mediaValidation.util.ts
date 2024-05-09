import { MediaType } from "../constants/enums/media.enum";
import CustomError from "./customError.util";
import { HTTPStatusCode } from "./helper";

class MediaValidation {
  validate(fileLength: number, fileExtensions: string, mediaType: MediaType) {
    let acceptedExtensions: string[] = [];
    let acceptedFileSize = 0;

    switch (mediaType) {
      case MediaType.ORGANIZER_DOCUMENT:
        acceptedExtensions = [".pdf"];
        acceptedFileSize = 1024 * 1024 * 5; //5mb
        break;

      case MediaType.USER_PROFILE:
        acceptedExtensions = [".png", ".jpg", ".jpeg"];
        acceptedFileSize = 1024 * 1024; //1mb
        break;

      case MediaType.EVENT_COVER:
        acceptedExtensions = [".png", ".jpg", ".jpeg"];
        acceptedFileSize = 1024 * 1024; //1mb
        break;

      case MediaType.EVENT_IMAGE:
        acceptedExtensions = [".png", ".jpg", ".jpeg"];
        acceptedFileSize = 1024 * 1024; //1mb
        break;
    }

    //checking file extensions
    if (!acceptedExtensions.includes(fileExtensions)) {
      throw new CustomError(
        `Invalid file type, only supports ${acceptedExtensions.join(" ")}`,
        HTTPStatusCode.BAD_REQUEST
      );
    }

    //file size validation
    if (fileLength > acceptedFileSize) {
      console.log(fileLength);
      throw new CustomError(
        "File size exceed. Its limit is : " +
          acceptedFileSize / (1024 * 1024) +
          " MB",
        HTTPStatusCode.BAD_REQUEST
      );
    }
  }
}

export default new MediaValidation();
