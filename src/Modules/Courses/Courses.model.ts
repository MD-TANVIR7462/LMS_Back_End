import { Schema, model, Document, Types } from "mongoose";
import { ICourse } from "./Courses.interface";




const courseSchema = new Schema<ICourse>(
   {
      title: {
         type: String,
         required: [true, "Course title is required"],
         trim: true
      },
      thumbnail: {
         type: String,
         required: [true, "Course thumbnail URL is required"],
         trim: true
      },
      price: {
         type: Number,
         required: [true, "Course price is required"],
         min: [0, "Price cannot be negative"]
      },
      description: {
         type: String,
         required: [true, "Course description is required"],
         trim: true
      },
      createdBy: {
         type: Types.ObjectId,
         ref: "User",
         required: true
      },
      isActive: {
         type: Boolean,
         default: true
      },
      tags: {
         type: [String],
         default: [],
         index: true
      },
      language: {
         type: String,
         trim: true
      },

   },
   {
      timestamps: true,
      versionKey: false,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
   }
);

// Index for search optimization
courseSchema.index({ title: "text", description: "text", tags: 1 });


export const CourseModel = model<ICourse>("Course", courseSchema);
