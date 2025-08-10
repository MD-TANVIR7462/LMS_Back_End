import { z } from "zod";
import mongoose from "mongoose";

export const courseSchemaValidation = z.object({
   title: z.string().min(1, "Title is required"),
   thumbnail: z.string().url("Thumbnail must be a valid URL"),
   price: z.number().min(0, "Price must be a positive number"),
   description: z.string().min(1, "Description is required"),
   createdBy: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
         message: "Invalid createdBy ObjectId",
      }),
   isActive: z.boolean(),
   tags: z.array(z.string()).optional(),
   language: z.string().optional(),

});
