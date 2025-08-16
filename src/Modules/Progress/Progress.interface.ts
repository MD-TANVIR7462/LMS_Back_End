import { Types } from "mongoose";

export interface IUserCourseProgress {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  watchedLectures: Types.ObjectId[];
}
