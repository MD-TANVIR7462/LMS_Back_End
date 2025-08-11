import mongoose from "mongoose";
import { z } from "zod";



export const moduleValidationSchema = z.object({
  courseId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid courseId",
    }),
  title: z.string().min(1, "Title is required"),
  moduleNumber: z.number().int().min(1, "Module number must be at least 1"),
  description: z.string().min(1, "Description is required"),
  totalLectures: z.number().int().min(0, "Total lectures must be 0 or more").optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});
