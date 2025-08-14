import { Schema, model, Types } from "mongoose";
import { ILectures } from "./Lecture.interface";

const pdfNotesSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const lecturesSchema = new Schema<ILectures>(
  {
    moduleId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfNotes: [pdfNotesSchema],
    isDeleted: { type: Boolean, default: false },
    completedBy: { type: [Schema.Types.ObjectId], default: [] },
    isUnlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const LecturesModel = model<ILectures>("Lectures", lecturesSchema);
