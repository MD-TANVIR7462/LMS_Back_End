import mongoose, { Types } from "mongoose";
import { IModule } from "./Modules.interface";
import { ModuleModel } from "./Modules.model";
import { CourseModel } from "../Courses/Courses.model";

export const createAModule = async (module: IModule) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Find course within the transaction
    const course = await CourseModel.findById(module.courseId).session(session);
    if (!course) {
      throw new Error("Course not found");
    }

    // Step 2: Create the module within the transaction
    const newModule = await ModuleModel.create([module], { session });
    const createdModule = newModule[0];

    // Step 3: Push the module _id into course.modules
    course.modules = course.modules || [];
    course.modules.push(createdModule._id as Types.ObjectId);
    await course.save({ session });

    // Step 4: Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return createdModule;
  } catch (error) {
    // Rollback if something goes wrong
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
