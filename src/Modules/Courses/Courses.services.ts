import { ICourse } from "./Courses.interface";
import { CourseModel } from "./Courses.model";
import { Types } from "mongoose";

const createAcourse = async (course: ICourse) => {
  const res = await CourseModel.create(course);
  return res;
};

const getAllCourses = async () => {
  const queryFilter = {
    isDeleted: false,
    isActive: true,
  };
  const res = await CourseModel.find(queryFilter);
  return res;
};

const getSingleCourse = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid course ID");
  }
  const res = await CourseModel.findById(id);
  return res;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid course ID");
  }
  const res = await CourseModel.findByIdAndUpdate(id, payload, { new: true });
  return res;
};

const deleteCourse = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid course ID");
  }
  const res = await CourseModel.findByIdAndDelete(id);
  return res;
};

const toggleCourseStatus = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid course ID");
  }
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new Error("Course not found");
  }
  course.isActive = !course.isActive;
  await course.save();
  return course;
};

export const courseServices = {
  createAcourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
};
