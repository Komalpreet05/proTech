import express from "express";
import { addStudent, getAllStudents, getStudentsByTeacher,getObservationsByStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/addStudent", addStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/getStudents/:teacherName", getStudentsByTeacher)
router.get("/studentprofile/:studentName", getObservationsByStudent)


export default router;