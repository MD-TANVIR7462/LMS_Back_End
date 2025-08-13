import { z } from "zod";
import mongoose from "mongoose";
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));
export const courseSchemaValidation = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  modules: z.array(objectIdSchema).optional(),
  createdBy: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid createdBy ObjectId",
  }).optional(),
  isActive: z.boolean().optional(),
  language: z.string().optional().default("English"),
  isDeleted: z.boolean().optional(),
}).strict();

export const courseUpdateSchemaValidation = courseSchemaValidation.partial();
