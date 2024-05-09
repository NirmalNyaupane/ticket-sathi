import { z } from "zod";

export const updateUserDetails = z.object({
  fullName: z
    .string({
      required_error: "Full Name is required",
    })
    .min(1, "Full Name is required")
    .min(5, "Minimum length must be 5 characters")
    .max(40, "Maximum length must be 40 characters")
    .trim()
    .includes(" ", {
      message: "Please enter both first name and last name",
    }),

  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .max(10, "Please enter valid phone number")
    .min(10, "Please enter valid phone number"),

  address: z.optional(z.string()),
});
