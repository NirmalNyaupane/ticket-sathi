import { z } from "zod";

const categoryValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(5, "Name must be minimum 5 characters")
    .max(30, "Name cannot be maximum 30 characters"),
  description: z
    .string()
    .min(30, "Description must be 30 characters")
    .max(250, "Description cannot be more than 250 characters"),
});

export default categoryValidation;