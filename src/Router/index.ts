import { Router } from "express";
import { CourseRoutes } from "../Modules/Courses/Courses.routes";
import { moduleRoutes } from "../Modules/CourseModules/Modules.routes";

const router = Router();
router.use("/course", CourseRoutes);
router.use("/moduleRoutes", moduleRoutes);

export default router;
