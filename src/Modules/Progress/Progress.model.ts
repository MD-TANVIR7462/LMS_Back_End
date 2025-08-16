import { Schema, model, Types } from "mongoose";

export interface IUserCourseProgress {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  watchedLectures: Types.ObjectId[];
}

const UserCourseProgressSchema = new Schema<IUserCourseProgress>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    courseId: { type:Schema.Types.ObjectId, required: true, ref: "Course" },
    watchedLectures: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

export const UserCourseProgressModel = model<IUserCourseProgress>(
  "UserCourseProgress",
  UserCourseProgressSchema
);
