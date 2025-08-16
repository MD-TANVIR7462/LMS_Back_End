// routes/progress.route.ts
import { Router } from "express";
import { userCourseProgressControllers } from "./Progress.Controller";


const router = Router();


router.post("/add", userCourseProgressControllers.addWatchedLecture);


router.get("/:userId/:courseId", userCourseProgressControllers.fetchUserCourseProgress);

export const progressRouter = router;
