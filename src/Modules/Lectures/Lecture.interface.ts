import { Types } from "mongoose";

export interface ILectures {
  moduleId: Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfNotes?: {
    title: string;
    url: string;
  }[];
  completedBy?: Types.ObjectId[];
  isUnlocked?: boolean;
  isDeleted?: boolean;
}
