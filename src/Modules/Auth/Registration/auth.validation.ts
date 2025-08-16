import { z } from "zod";

export const registrationValidationSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(100, "Name cannot exceed 100 characters."),
    email: z.string().trim().toLowerCase().email("Please provide a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(20, "Password can not be more then 20 characters"),
   role: z.enum(["user", "admin"], "Role is required."),
    location: z.string().trim().max(200, "Location cannot exceed 200 characters.").optional(),
    phone: z
      .string()
      .trim()
      .regex(/^\d{10,15}$/, "Please provide a valid phone number.")
      .optional(),
    img: z.string().trim().url("Please provide a valid image URL."),
    isActive: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
    needPasswordChange: z.boolean().default(true),
  })
  .strict();
