import { Arg, Mutation, Resolver } from "type-graphql";
// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import path from "path";
import { type Stream } from "stream";
import { MediaType } from "../../constants/enums/media.enum";
import { MediaSchema } from "../../schemas/media/media.schema";
import mediaService from "../../service/media/media.service";
import mediaValidationUtil from "../../utils/mediaValidation.util";
interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver()
export class MediaResolver {
  @Mutation(() => MediaSchema)
  async uploadMedia(
    @Arg("file", () => GraphQLUpload) file: Upload,
    @Arg("mediaType", () => MediaType) mediaType: MediaType
  ) {
    const fileExtensions = path.extname(file.filename);
   await new Promise((resolve, reject) => {
      let count = 0;
      file
        .createReadStream()
        .on("data", (chunk) => {
          count += chunk.length;
          try {
            mediaValidationUtil.validate(count, fileExtensions, mediaType);
          } catch (error) {
            reject(error);
          }
        })
        .on("error", (error) => {
          reject(error);
        })
        .on("end", () => {
          resolve(count);
        });
    });
    return await mediaService.uploadMedia(file, mediaType);
  }
}
