import express from "express";
import { addObservation, getObservationsByStudent } from "../controllers/observationController.js";

const router = express.Router();

router.post("/addObservation", addObservation);
router.get("/:studentId", getObservationsByStudent);

export default router;