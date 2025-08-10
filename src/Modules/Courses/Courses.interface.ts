import { ObjectId } from "mongoose";
export interface ICourse {
  title: string;
  thumbnail: string; 
  price: number;
  description: string;
  createdBy: ObjectId;
  isActive: boolean;
  tags?: string[];
  language?: string;
}