import { z } from "zod";

export const changePasswordValidation = z
  .object({
    oldPassword: z
      .string({ required_error: "OldPassword is required" })
      .min(8, "OldPassword must be minimum 8 characters")
      .regex(/[a-z]/, "At least one lowercase is required")
      .regex(/[A-Z]/, "At least one Uppercase is required")
      .regex(/\d/, "At least one digit is requried")
      .regex(/[^a-zA-Z0-9 ]/, "At least one special character is required"),

    newPassword: z
      .string({ required_error: "NewPassword is required" })
      .min(8, "NewPassword must be minimum 8 characters")
      .regex(/[a-z]/, "At least one lowercase is required")
      .regex(/[A-Z]/, "At least one Uppercase is required")
      .regex(/\d/, "At least one digit is requried")
      .regex(/[^a-zA-Z0-9 ]/, "At least one special character is required"),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(8, "Confirm Password must be minimum 8 characters")
      .regex(/[a-z]/, "At least one lowercase is required")
      .regex(/[A-Z]/, "At least one Uppercase is required")
      .regex(/\d/, "At least one digit is requried")
      .regex(/[^a-zA-Z0-9 ]/, "At least one special character is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password doesnot match",
    path: ["confirmPassword"],
  });
