import { DiscountType } from "@/__generated__/graphql";
import { z } from "zod";
export const ticketValidation = z
  .object({
    name: z.string().min(1, { message: "name is required" }).max(15),
    price: z
      .string()
      .min(1, "Price is required")
      .transform((data) => Number(data)),
    isUnlimited: z.boolean().default(false),
    totalTicket: z
      .string()
      .optional()
      .transform((data) => Number(data)),
    earlyBirdOffer: z.boolean().default(false),
    discount: z.string().optional(),
    discountEndDate: z
      .date()
      .optional()
      .refine(
        (date) => {
          if (date) {
            if (new Date(date) < new Date()) {
              return false;
            }
            return true;
          }
        },
        { message: "startDate must be a future date" }
      )
      .transform((date) => new Date(date ?? "")?.toISOString()),
    discountType: z
      .enum([DiscountType.Flat, DiscountType.Percentage])
      .optional(),
  })
  .refine(
    (field) => {
      if (field.isUnlimited) {
        if (!field.totalTicket) {
          return true;
        }
      }
    },
    {
      message: "total ticket is required",
      path: ["totalTicket"],
    }
  )
  .refine(
    (field) => {
      if (field.earlyBirdOffer) {
        if (!field.discountType) {
          return true;
        }
      }
    },
    {
      message: "Discount type is required",
      path: ["discountType"],
    }
  )
  .refine(
    (field) => {
      if (field.earlyBirdOffer) {
        if (field.discount) {
          return true;
        }
      }
    },
    {
      message: "Discount is required",
      path: ["discount"],
    }
  )
  .refine(
    (field) => {
      if (field.earlyBirdOffer) {
        if (field.discountEndDate) {
          return true;
        }
      }
    },
    {
      message: "Discount End Date is required",
      path: ["discountEndDate"],
    }
  )
  .refine(
    (field) => {
      if (field.discount) {
        if (field.discountType == DiscountType.Percentage) {
          if (Number(field.discount) < 100) {
            return true;
          }
        }
      }
    },
    {
      message: "Discount must be less than 100",
      path: ["discount"],
    }
  );
