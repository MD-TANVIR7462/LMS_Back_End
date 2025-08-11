import { RequestHandler } from "express";
import { courseSchemaValidation } from "./Courses.validation";
import { courseServices } from "./Courses.services";
import { Types } from "mongoose";
import { success } from "../../Utils/response";

const createAcourse: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = courseSchemaValidation.parse(req.body);
    const validatedData = {
      ...parsedData,
      createdBy: new Types.ObjectId(parsedData.createdBy),
    };
    const result = await courseServices.createAcourse(validatedData);
    success(res, result, "Course");
  } catch (err) {
    next(err);
  }
};

export const CourseControllers = {
  createAcourse,
};
