import { type Stream } from "stream";
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  // mediaType: Enumerator;
  createReadStream: () => Stream;
}