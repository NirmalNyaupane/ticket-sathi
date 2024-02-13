import { Arg, Mutation, Resolver } from "type-graphql";
// @ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { type Stream } from "stream";
import { MediaType } from "../../constants/enums/media.enum";
import { MediaSchema } from "../../schemas/media/media.schema";
import mediaService from "../../service/media/media.service";

interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver()
export class MediaResolver {
  @Mutation(() => MediaSchema)
  async uploadMedia(@Arg("file", () => GraphQLUpload) file: Upload, @Arg("mediaType", () => MediaType) mediaType: MediaType) {
    return await mediaService.uploadMedia(file, mediaType);
  }
}
