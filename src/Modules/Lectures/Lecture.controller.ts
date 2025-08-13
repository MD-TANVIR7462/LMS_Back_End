import { RequestHandler } from "express";
import { Types } from "mongoose";

import { success, emptyResponse, notUpdated } from "../../Utils/response";
import { StatusCodes } from "http-status-codes";
import { lecturesValidationSchema } from "./Lecture.validation";
import { lecturesServices } from "./Lecture.services";

// Create lecture
const createALecture: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = lecturesValidationSchema.parse(req.body);
    const validatedData = {
      ...parsedData,
      moduleId: new Types.ObjectId(parsedData.moduleId),
    };
    const result = await lecturesServices.createALecture(validatedData);
    success(res, result, "Lecture created", StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

// Get all lectures
const getAllLectures: RequestHandler = async (req, res, next) => {
  try {
    const result = await lecturesServices.getAllLectures();
    if (!result.length) emptyResponse(res, result);
    success(res, result, "Lectures fetched", result.length);
  } catch (err) {
    next(err);
  }
};

// Get single lecture
const getSingleLecture: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return notUpdated(res, id, null);

    const result = await lecturesServices.getSingleLecture(id);
    if (!result) return notUpdated(res, id, null);
    success(res, result, "Lecture fetched");
  } catch (err) {
    next(err);
  }
};

// Update lecture
const updateLecture: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return notUpdated(res, id, null);

    const parsedData = lecturesValidationSchema.partial().parse(req.body); // optional fields for update
    const validatedData = {
      ...parsedData,
      moduleId: parsedData.moduleId ? new Types.ObjectId(parsedData.moduleId) : undefined,
    };

    const result = await lecturesServices.updateLecture(id, validatedData);
    if (!result) return notUpdated(res, id, null);
    success(res, result, "Lecture updated");
  } catch (err) {
    next(err);
  }
};

// Delete lecture
const deleteLecture: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return notUpdated(res, id, null);

    const result = await lecturesServices.deleteLecture(id);
    if (!result) return notUpdated(res, id, null);
    success(res, result, "Lecture deleted");
  } catch (err) {
    next(err);
  }
};

// Toggle lecture status
const toggleLectureStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return notUpdated(res, id, null);

    const result = await lecturesServices.toggleLectureStatus(id);
    if (!result) return notUpdated(res, id, null);
    success(res, result, "Lecture status toggled");
  } catch (err) {
    next(err);
  }
};

export const LecturesControllers = {
  createALecture,
  getAllLectures,
  getSingleLecture,
  updateLecture,
  deleteLecture,
  toggleLectureStatus,
};
