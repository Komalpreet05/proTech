import express from "express";
import { addCurriculum, getCurriculumByTeacher } from "../controllers/curriculumController.js";

const router = express.Router();

router.post("/", addCurriculum);
router.get("/:teacherId", getCurriculumByTeacher);

export default router;