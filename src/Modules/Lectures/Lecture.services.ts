import { Types } from "mongoose";
import { LecturesModel } from "./Lecture.model";
import { ILectures } from "./Lecture.interface";



const createALecture = async (lecture: ILectures) => {
  const res = await LecturesModel.create(lecture);
  return res;
};


const getAllLectures = async () => {
  const queryFilter = { isDeleted: false };
  const res = await LecturesModel.find(queryFilter).populate("moduleId");
  return res;
};

const getSingleLecture = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid lecture ID");
  const res = await LecturesModel.findById(id).populate("moduleId");
  return res;
};


const updateLecture = async (id: string, payload: Partial<ILectures>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid lecture ID");
  const res = await LecturesModel.findByIdAndUpdate(id, payload, { new: true });
  return res;
};


const deleteLecture = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid lecture ID");
  const res = await LecturesModel.findByIdAndDelete(id);
  return res;
};


const toggleLectureStatus = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid lecture ID");
  const lecture = await LecturesModel.findById(id);
  if (!lecture) throw new Error("Lecture not found");
  lecture.isDeleted = !lecture.isDeleted;
  await lecture.save();
  return lecture;
};

export const lecturesServices = {
  createALecture,
  getAllLectures,
  getSingleLecture,
  updateLecture,
  deleteLecture,
  toggleLectureStatus,
};
