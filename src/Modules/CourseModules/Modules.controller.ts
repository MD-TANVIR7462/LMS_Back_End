import { RequestHandler } from "express";
import { Types } from "mongoose";
import { moduleUpdateValidationSchema, moduleValidationSchema } from "./Modules.validation";
import { moduleServices } from "./Modules.services";
import { success, emptyResponse, notUpdated } from "../../Utils/response";
import { StatusCodes } from "http-status-codes";

const createAModule: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = moduleValidationSchema.parse(req.body);

    const validatedData = {
      ...parsedData,
      courseId: new Types.ObjectId(parsedData.courseId),
    };

    const result = await moduleServices.createAModule(validatedData);
    success(res, result, "Module created", StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

const getAllModules: RequestHandler = async (req, res, next) => {
  try {
    const result = await moduleServices.getAllModules();
    if (!result.length) {
      emptyResponse(res, result);
    }
    success(res, result, "Modules fetched", result.length);
  } catch (err) {
    next(err);
  }
};

const getSingleModule: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await moduleServices.getSingleModule(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Module fetched");
  } catch (err) {
    next(err);
  }
};

const updateModule: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const parsedData = moduleUpdateValidationSchema.parse(req.body);
    const validatedData = {
      ...parsedData,
      courseId: parsedData.courseId ? new Types.ObjectId(parsedData.courseId) : undefined,
    };

    const result = await moduleServices.updateModule(id, validatedData);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Module updated");
  } catch (err) {
    next(err);
  }
};

const deleteModule: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await moduleServices.deleteModule(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Module deleted");
  } catch (err) {
    next(err);
  }
};

const toggleModuleStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return notUpdated(res, id, null);
    }

    const result = await moduleServices.toggleModuleStatus(id);
    if (!result) {
      return notUpdated(res, id, null);
    }
    success(res, result, "Module status toggled");
  } catch (err) {
    next(err);
  }
};

export const ModuleControllers = {
  createAModule,
  getAllModules,
  getSingleModule,
  updateModule,
  deleteModule,
  toggleModuleStatus,
};
