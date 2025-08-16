import { z } from "zod";
import { Types } from "mongoose";

export const userCourseProgressValidationSchema = z.object({
  userId: z.instanceof(Types.ObjectId, { message: "Invalid user ID" }),
  courseId: z.instanceof(Types.ObjectId, { message: "Invalid course ID" }),
  lectureId: z.instanceof(Types.ObjectId, { message: "Invalid lecture ID" }) 
});
