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
    discount: z
      .string()
      .optional()
      .transform((discount) => Number(discount)),
    discountEndDate: z
      .date()
      .optional()
      .transform((val, ctx) => {
        if (val) {
          return new Date(val).toISOString();
        }
      }),
    discountType: z
      .enum([DiscountType.Flat, DiscountType.Percentage])
      .optional(),
  })
  .refine(
    (field) => {
      if (field.isUnlimited) return true;
      if (field.totalTicket) {
        return true;
      } else {
        return false;
      }
    },
    {
      message: "total ticket is required",
      path: ["totalTicket"],
    }
  )
  .refine(
    (field) => {
      if (!field.earlyBirdOffer) return true;
      if (field.discount) {
        return true;
      }
      return false;
    },
    {
      message: "Discount is required",
      path: ["discount"],
    }
  )
  .refine(
    (field) => {
      if (!field.earlyBirdOffer) return true;
      if (field.discountType) return true;
      return false;
    },
    {
      message: "Discount type is required",
      path: ["discountType"],
    }
  )
  .refine(
    (field) => {
      if (!field.earlyBirdOffer) return true;
      if (field.discountEndDate) return true;
      return false;
    },
    {
      message: "Discount end date is required",
      path: ["discountEndDate"],
    }
  )
  .refine(
    (field) => {
      if (!field.earlyBirdOffer) return true;
      if (field.discountEndDate) {
        if (new Date(field.discountEndDate) < new Date()) {
          return false;
        }
        return true;
      }
      return false;
    },
    {
      message: "Discount end must be a future date",
      path: ["discountEndDate"],
    }
  )
  .refine(
    (field) => {
      if (!field.earlyBirdOffer) return true;
      if (field.discountType === DiscountType.Percentage) {
        if (field.discount > 100) {
          return false;
        }
        return true;
      }
    },
    {
      message: "Discount must be less than 100",
      path: ["discount"],
    }
  );
