import Curriculum from "../models/curriculum.js";

// Add a new curriculum
export const addCurriculum = async (req, res) => {
  const { grade, subject, metrics, teacher } = req.body;

  try {
    const curriculum = new Curriculum({ grade, subject, metrics, teacher });
    await curriculum.save();
    res.status(201).json({ message: "Curriculum added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get curriculum by teacher
export const getCurriculumByTeacher = async (req, res) => {
  try {
    const curriculum = await Curriculum.find({ teacher: req.params.teacherId });
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};