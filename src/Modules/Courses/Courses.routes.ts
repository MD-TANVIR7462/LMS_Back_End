import { Router } from "express";
import { CourseControllers } from "./Corses.controller";
import { permission } from "../../Utils";

const router = Router();

router.get("/get-courses",permission.bothUsers ,CourseControllers.getAllCourses);
router.get("/get-course/:id",permission.bothUsers, CourseControllers.getSingleCourse);
router.post("/create-course",permission.admin ,CourseControllers.createAcourse);
router.delete("/delete-course/:id",permission.admin , CourseControllers.deleteCourse);
router.patch("/update-course/:id",permission.admin , CourseControllers.updateCourse);
router.patch("/status/:id",permission.admin , CourseControllers.toggleCourseStatus);

export const CourseRoutes = router;
