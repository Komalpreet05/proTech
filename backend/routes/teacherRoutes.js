import express from "express";
import { loginTeacher, registerTeacher, getAllTeachers, updateTeacherSubjects } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.get("/", getAllTeachers);
router.post("/login", loginTeacher);
router.post("/update", updateTeacherSubjects);

export default router;