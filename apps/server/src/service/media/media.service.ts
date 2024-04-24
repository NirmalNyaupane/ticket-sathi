import { AppDataSource } from "../../config/database.config";
import { MediaType } from "../../constants/enums/media.enum";
import { Upload } from "../../constants/types/media.type";
import { Media } from "../../entities/media/media.entity";
import { PathUtil } from "../../utils/path.util";
import fs, {createWriteStream} from "fs";
import path from 'path';

class MediaService {
    async uploadMedia(file: Upload, mediaType: MediaType): Promise<Media> {
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();
        const fileId = Date.now(); // Generate a unique ID for the file

        if (!fs.existsSync(PathUtil.UPLOADS_FOLDER_PATH)) {
            fs.mkdirSync(PathUtil.UPLOADS_FOLDER_PATH, { recursive: true });
        }

        if (!fs.existsSync(PathUtil.TEMP_FOLDER_PATH)) {
            fs.mkdirSync(PathUtil.TEMP_FOLDER_PATH, { recursive: true });
        }

        const updatedFileName = `${fileId}-${path.extname(file.filename)}`;
        // Save the file to the temp directory
        const tempPath = path.join(PathUtil.TEMP_FOLDER_PATH, updatedFileName);

        const writeStream = createWriteStream(tempPath);
        await new Promise<void>((resolve, reject) => {
            // stream.pipe(writeStream).on('finish', resolve).on('error', reject);
            stream
                .pipe(writeStream)
                .on("finish", () => {
                    console.log("File write finished successfully");
                    resolve();
                })
                .on("error", (error:any) => {
                    console.error("Error writing file:", error);
                    reject(error);
                });
        });

        // Now, create a Media entity and save its details to the database
        const media = new Media();
        (media.name = updatedFileName), (media.mimeType = mimetype);
        media.mediaType = mediaType; // or whatever your logic dictates
        await media.save();

        console.log("Media details from media service", media);

        return media;
    }

    async findMultipleMediabyIds(mediaIds: Media[]) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
          const results = mediaIds.map((media) => {
            return queryRunner.manager
              .createQueryBuilder(Media, "media")
              .where("media.id=:id", { id: media.id })
              .getOne();
          });
    
          await queryRunner.commitTransaction();
          return Promise.all(results);
        } catch (err) {
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      }
    
}

export default new MediaService();