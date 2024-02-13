import { z } from "zod";

const organizerRegisterFormValidation = z.object({
  organizer_name: z
    .string()
    .min(1, "Organizer Name is reqired")
    .min(3, "Organizer Name must be minimum 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(30, "Description must be minimum 30 characters"),
  address: z.string().min(1, "Address is required"),
  logo: z
    .any()
    .refine((file: File) => file?.name, { message: "Logo is required" }),
  social_links: z
    .array(
      z.object({
        name: z.string().min(1, "name is required"),
        url: z.string().min(1, "url is required").url("url must be an url"),
      })
    ),
  website: z
    .string()
    .min(1, "Website is required")
    .url("Website must be an url"),
});

export default organizerRegisterFormValidation;
