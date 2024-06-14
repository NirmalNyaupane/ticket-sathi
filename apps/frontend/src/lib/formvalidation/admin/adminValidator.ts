import { z } from "zod";
export const changeOrganzierStatusValidator = z.object({
  message: z.string().min(1, { message: "message is required" }).min(30),
});

export const createCommissionValidator = z.object({
  commission: z.number().max(50),
});
