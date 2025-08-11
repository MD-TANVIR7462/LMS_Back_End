import { Types } from "mongoose";

export interface ICourse {
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  createdBy: Types.ObjectId;
  isActive: boolean;
  tags?: string[];
  language?: string;
}
