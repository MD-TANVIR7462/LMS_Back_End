import { Schema, model } from "mongoose";
import { ICourse } from "./Courses.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Course thumbnail URL is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    modules: {
      type: [{ type: Schema.Types.ObjectId, ref: "Module" }],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      trim: true,
      default: "English",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const CourseModel = model<ICourse>("Course", courseSchema);
