import { ICourse } from "./Courses.interface";
import { CourseModel } from "./Courses.model";

const createAcourse = async (module: ICourse) => {
  const res = await CourseModel.create(module);
  return res;
};


export const courseServices = {
    createAcourse,
}