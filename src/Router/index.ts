import { Router } from "express";
import { CourseRoutes } from "../Modules/Courses/Courses.routes";
import { moduleRoutes } from "../Modules/CourseModules/Modules.routes";
import { lectureRoutes } from "../Modules/Lectures/Lecture.routes";
import { RegistrationRoutes } from "../Modules/Auth/Registration/auth.routes";
import { LoginRoutes } from "../Modules/Auth/Login/login.routes";
import { progressRouter } from "../Modules/Progress/Progress.route";

const router = Router();
router.use("/course", CourseRoutes);
router.use("/module", moduleRoutes);
router.use("/lecture", lectureRoutes);
router.use("/auth/register", RegistrationRoutes);
router.use("/auth/login", LoginRoutes);
router.use("/progress", progressRouter);

export default router;
