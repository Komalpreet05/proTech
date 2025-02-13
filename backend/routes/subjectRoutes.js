import express from "express";
import { createSubject, getAllSubjectsOfTeacher } from "../controllers/subjectController.js";

const router = express.Router();

router.post("/createSubject", createSubject);
router.get("/getAllSubjects/:teacherName", getAllSubjectsOfTeacher);


export default router;