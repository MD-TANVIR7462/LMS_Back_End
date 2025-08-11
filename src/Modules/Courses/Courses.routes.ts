import { Router } from "express";
import { CourseControllers } from "./Corses.controller";

const router = Router();

router.get("/get-courses", CourseControllers.getAllCourses);
router.get("/get-course/:id", CourseControllers.getSingleCourse);
router.post("/create-course", CourseControllers.createAcourse);
router.delete("/delete-course/:id", CourseControllers.deleteCourse);
router.patch("/update-course/:id", CourseControllers.updateCourse);
router.patch("/status/:id", CourseControllers.toggleCourseStatus);

export const CourseRoutes = router;
