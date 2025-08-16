import { RequestHandler } from "express";
import { Types } from "mongoose";
import { UserCourseProgressModel } from "./Progress.model";
import { StatusCodes } from "http-status-codes";
import { success, notUpdated, emptyResponse } from "../../Utils/response";
import { userCourseProgressValidationSchema } from "./Progress.validation";


const addWatchedLecture: RequestHandler = async (req, res, next) => {
   try {
      const parsedData = userCourseProgressValidationSchema.parse(req.body);

      const result = await UserCourseProgressModel.findOneAndUpdate(
         { userId: parsedData.userId, courseId: parsedData.courseId },
         { $addToSet: { watchedLectures: parsedData.lectureId } }, 
         { upsert: true, new: true }
      );

      if (!result) return notUpdated(res, "Unable to update progress", null);
      success(res, result, "Lecture marked as watched", StatusCodes.OK);
   } catch (err: any) {
      next(err);
   }
};


const fetchUserCourseProgress: RequestHandler = async (req, res, next) => {
   try {
      const { userId, courseId } = req.params;

      if (!userId || !courseId)
         return notUpdated(res, "User ID and Course ID are required", null);

      const progress = await UserCourseProgressModel.findOne({
         userId: new Types.ObjectId(userId),
         courseId: new Types.ObjectId(courseId),
      }).lean();

      if (!progress) emptyResponse(res, []);
      success(res, progress, "User course progress fetched", StatusCodes.OK);
   } catch (err: any) {
      next(err);
   }
};


export const userCourseProgressControllers = {
   addWatchedLecture,
   fetchUserCourseProgress,
};
