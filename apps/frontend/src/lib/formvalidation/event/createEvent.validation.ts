import { EventType } from "@/__generated__/graphql";
import { z } from "zod";

const createEventValidation = z
  .object({
    name: z.string().min(1, "name is required").max(100),
    description: z.string().min(1, "description is required").min(30).max(500),
    eventStartDate: z
      .date()
      .transform((date) => new Date(date).toISOString())
      .refine(
        (date) => {
          if (new Date(date) < new Date()) {
            return false;
          }
          return true;
        },
        { message: "startDate must be a future date" }
      ),
    eventEndDate: z
      .date()
      .transform((date) => new Date(date).toISOString())
      .refine(
        (date) => {
          if (new Date(date) < new Date()) {
            return false;
          }
          return true;
        },
        { message: "endDate must be a future date" }
      ),
    type: z.enum([EventType.Concert, EventType.Theater, EventType.Virtual]),
    venue: z.string().min(1, "venue is required"),
    images: z
      .any()
      .optional()
      .refine(
        (data: File[]) => {
          if (!data) return true;
          if (data.length === 0) return true;
          for (let file of data) {
            if (file.size >= 1 * 1024 * 1024) {
              return false;
            }
          }
          return true;
        },
        {
          message: "image size must be equal of less than 1MB",
        }
      ),

    cover: z
      .any()
      .refine((file: File) => (file ? true : false), "File is required")
      .refine(
        (data: File) => {
          if (data?.size >= 1 * 1024 * 1024) {
            return false;
          }
          return true;
        },
        {
          message: "cover image must or less than 1MB",
        }
      ),

    categoryId: z.string().uuid(),
  })
  .refine(
    (data) => {
      if (new Date(data.eventStartDate) < new Date(data.eventEndDate)) {
        return true;
      }
    },
    {
      message: "End date must be greter than start date",
      path: ["eventEndDate"],
    }
  );

export default createEventValidation;
