import { Types } from "mongoose";
import { IModule } from "./Modules.interface";
import { ModuleModel } from "./Modules.model";

const createAModule = async (module: IModule) => {
  const res = await ModuleModel.create(module);
  return res;
};

const getAllModules = async () => {
  const queryFilter = {
    isDeleted: false,
    isActive: true,
  };
  const res = await ModuleModel.find(queryFilter).populate("courseId");
  return res;
};

const getSingleModule = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid module ID");
  }
  const res = await ModuleModel.findById(id).populate("courseId");
  return res;
};

const updateModule = async (id: string, payload: Partial<IModule>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid module ID");
  }
  const res = await ModuleModel.findByIdAndUpdate(id, payload, { new: true });
  return res;
};

const deleteModule = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid module ID");
  }
  const res = await ModuleModel.findByIdAndDelete(id);
  return res;
};

const toggleModuleStatus = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid module ID");
  }
  const module = await ModuleModel.findById(id);
  if (!module) {
    throw new Error("Module not found");
  }
  module.isActive = !module.isActive;
  await module.save();
  return module;
};

export const moduleServices = {
  createAModule,
  getAllModules,
  getSingleModule,
  updateModule,
  deleteModule,
  toggleModuleStatus,
};
