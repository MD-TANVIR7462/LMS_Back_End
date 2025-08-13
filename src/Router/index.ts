import { Router } from "express";
import { CourseRoutes } from "../Modules/Courses/Courses.routes";
import { moduleRoutes } from "../Modules/CourseModules/Modules.routes";
import { lectureRoutes } from "../Modules/Lectures/Lecture.routes";

const router = Router();
router.use("/course", CourseRoutes);
router.use("/module", moduleRoutes);
router.use("/lecture", lectureRoutes);

export default router;
