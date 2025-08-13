import { Types } from "mongoose";

export interface ICourse {
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  modules?:Types.ObjectId[]
  createdBy?: Types.ObjectId;
  isActive?: boolean;
  language?: string;
  isDeleted?:boolean
}
