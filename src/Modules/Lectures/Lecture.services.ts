import mongoose, { Types } from "mongoose";
import { LecturesModel } from "./Lecture.model";
import { ILectures } from "./Lecture.interface";
import { ModuleModel } from "../CourseModules/Modules.model";

export const createALecture = async (lecture: ILectures) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Find module within the transaction
    const module = await ModuleModel.findById(lecture.moduleId).session(session);
    if (!module) {
      throw new Error("Module not found");
    }

    // Step 2: Create the lecture within the transaction
    const newLectureDocs = await LecturesModel.create([lecture], { session });
    const createdLecture = newLectureDocs[0];

    // Step 3: Push the lecture _id into module.lectures array
    module.lectures = module.lectures || [];
    module.lectures.push(createdLecture._id as Types.ObjectId);

    // Update total lectures count
    module.totalLectures = module.lectures.length;

    await module.save({ session });

    // Step 4: Commit transaction
    await session.commitTransaction();
    session.endSession();

    return createdLecture;
  } catch (error) {
    // Rollback if something goes wrong
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
