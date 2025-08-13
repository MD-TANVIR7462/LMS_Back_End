import { Types } from "mongoose";

export interface IModule {
  courseId: Types.ObjectId;
  title: string;
  moduleNumber: number;
  lectures?:Types.ObjectId
  totalLectures?: number;
  isActive?: boolean;
  isDeleted?: boolean;
}
