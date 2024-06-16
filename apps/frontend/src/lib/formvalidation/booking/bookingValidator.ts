import { PaymentMethod } from "@/__generated__/graphql";

import { z } from "zod";
export const bookingValidator = z.object({
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

  address: z.string().min(1, "address is required"),
  city: z.string().min(1, "city is required"),
  email: z.string().email(),
  paymentMethod: z.enum([PaymentMethod.Esewa]),
  state: z.string().min(1, "state is required"),
  zipCode: z.string().min(1, "zipCode is required"),
  country: z.string().min(1, "country is required"),
});
