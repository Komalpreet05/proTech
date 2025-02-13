import Observation from "../models/observation.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Subject from "../models/subject.js";
// Add a new observation
export const addObservation = async (req, res) => {
  const { student, teacher, subject, metric, observationText } = req.body;

  try {
    // Find the ObjectId for the given student name
    const studentDoc = await Student.findOne({ name: student });
    if (!studentDoc) {
      return res.status(404).json({ message: `Student '${student}' not found` });
    }

    // Find the ObjectId for the given teacher name
    const teacherDoc = await Teacher.findOne({ name: teacher });
    if (!teacherDoc) {
      return res.status(404).json({ message: `Teacher '${teacher}' not found` });
    }

    // Find the ObjectId for the given subject name
    const subjectDoc = await Subject.findOne({ name: subject });
    if (!subjectDoc) {
      return res.status(404).json({ message: `Subject '${subject}' not found` });
    }

    // Create the observation with the found ObjectIds
    const observation = new Observation({
      student: studentDoc._id, // Use the ObjectId of the student
      teacher: teacherDoc._id, // Use the ObjectId of the teacher
      subject: subjectDoc._id, // Use the ObjectId of the subject
      metric,
      observationText,
    });

    // Save the observation
    await observation.save();

    // Return success response
    res.status(200).json({ message: "Observation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get observations for a student
export const getObservationsByStudent = async (req, res) => {
  try {
    const observations = await Observation.find({ student: req.params.studentId }).populate("teacher");
    res.status(200).json(observations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};