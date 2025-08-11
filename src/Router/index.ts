import { Router } from "express";
import { CourseRoutes } from "../Modules/Courses/Courses.routes";

const router = Router();
router.use("/course", CourseRoutes);

export default router;
