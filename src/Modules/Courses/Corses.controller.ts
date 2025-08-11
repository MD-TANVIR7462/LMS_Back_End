import { RequestHandler } from "express";
import { courseSchemaValidation, courseUpdateSchemaValidation } from "./Courses.validation";
import { courseServices } from "./Courses.services";
import { Types } from "mongoose";
import { success, emptyResponse, notUpdated, anyError } from "../../Utils/response";
import { StatusCodes } from "http-status-codes";
import { ICourse } from "./Courses.interface";

const createAcourse: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = courseSchemaValidation.parse(req.body);

    const validatedData = {
      ...parsedData,
      createdBy: new Types.ObjectId(parsedData.createdBy),
    };

    const result = await courseServices.createAcourse(validatedData);
    success(res, result, "Course created", StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

const getAllCourses: RequestHandler = async (req, res, next) => {
  try {
    const result = await courseServices.getAllCourses();
    if (!result.length) {
      emptyResponse(res, result);
    }
    success(res, result, "Courses fetched", result.length);
  } catch (err) {
    next(err);
  }
};

const getSingleCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await courseServices.getSingleCourse(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Course fetched");
  } catch (err) {
    next(err);
  }
};

const updateCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }
    const parseData = courseUpdateSchemaValidation.parse(req.body);
    const validatedData = {
      ...parseData,
      createdBy: new Types.ObjectId(parseData.createdBy),
    };

    const result = await courseServices.updateCourse(id, validatedData);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Course updated");
  } catch (err) {
    next(err);
  }
};

const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await courseServices.deleteCourse(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Course deleted");
  } catch (err) {
    next(err);
  }
};

const toggleCourseStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await courseServices.toggleCourseStatus(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Course status toggled");
  } catch (err) {
    next(err);
  }
};

export const CourseControllers = {
  createAcourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
};
