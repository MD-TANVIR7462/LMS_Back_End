import { Router } from "express";
import { LecturesControllers } from "./Lecture.controller";

const router = Router();

router.get("/get-lectures", LecturesControllers.getAllLectures);
router.get("/get-lecture/:id", LecturesControllers.getSingleLecture);
router.post("/create-lecture", LecturesControllers.createALecture);
router.delete("/delete-lecture/:id", LecturesControllers.deleteLecture);
router.patch("/update-lecture/:id", LecturesControllers.updateLecture);
router.patch("/status/:id", LecturesControllers.toggleLectureStatus);

export const lectureRoutes = router;
