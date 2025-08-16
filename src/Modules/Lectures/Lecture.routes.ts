import { Router } from "express";
import { LecturesControllers } from "./Lecture.controller";
import { permission } from "../../Utils";

const router = Router();

router.get("/get-lectures",  LecturesControllers.getAllLectures);
router.get("/get-lecture/:id",  LecturesControllers.getSingleLecture);
router.post("/create-lecture", permission.admin, LecturesControllers.createALecture);
router.delete("/delete-lecture/:id", permission.admin, LecturesControllers.deleteLecture);
router.patch("/update-lecture/:id", permission.admin, LecturesControllers.updateLecture);
router.patch("/status/:id", permission.admin, LecturesControllers.toggleLectureStatus);

export const lectureRoutes = router;
