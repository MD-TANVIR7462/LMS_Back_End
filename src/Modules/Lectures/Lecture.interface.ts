import { Types } from "mongoose";

export interface ILectures {
  moduleId: Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfNotes?: {
    title: string;
    url: string;
  }[];
  isDeleted?: boolean;
}
