import { z } from 'zod'
const organizerRegisterValidation = z
    .object({
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
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be an email",
            })
            .email("Email must be an email"),
        phone: z
            .string({
                required_error: "Phone number is required",
            })
            .max(10, "Please enter valid phone number")
            .min(10, "Please enter valid phone number"),

        password: z
            .string({ required_error: "Password is required" })
            .min(8, "Password must minimum be 8 characters")
            .regex(/[a-z]/, "At least one lowercase is required")
            .regex(/[A-Z]/, "At least one Uppercase is required")
            .regex(/\d/, "At least one digit is requried")
            .regex(/[^a-zA-Z0-9 ]/, "At least one special character is required"),

        confirmPassword: z
            .string({
                required_error: "Confirm password is requrired",
            })
            .min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesnot match",
        path: ["confirmPassword"],
    });

export default organizerRegisterValidation;