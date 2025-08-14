import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

export const lecturesValidationSchema = z.object({
  moduleId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url("Invalid video URL"),
  completedBy: z.array(objectIdSchema).optional(),
  isUnlocked: z.boolean().optional(),
  pdfNotes: z
    .array(
      z.object({
        title: z.string().min(1, "PDF title is required"),
        url: z.string().url("Invalid PDF URL"),
      })
    )
    .optional(),
  isDeleted: z.boolean().optional(),
});
