import { z } from "zod";
export const changeOrganzierStatusValidator = z.object({
  message: z.string().min(1, { message: "message is required" }).min(30),
});

export const createCommissionValidator = z.object({
  commission: z
    .string()
    .transform((value) => Number(value))
    .refine(
      (value) => {
        if (value > 50) {
          return false;
        }
        return true;
      },
      { message: "commission cannot be greter than 50 percentage" }
    )
});
