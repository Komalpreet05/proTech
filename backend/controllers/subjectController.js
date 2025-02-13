import Subject from "../models/subject.js";
import Teacher from "../models/teacher.js"; // Assuming you have a Teacher model

// Controller to create a new subject
export const createSubject = async (req, res) => {
  const { name, teacherName } = req.body;

  // Validate the request body
  if (!name || !teacherName) {
    return res.status(400).json({ message: "Subject name and teacher name are required" });
  }

  try {
    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if the subject already exists for the teacher
    const existingSubject = await Subject.findOne({ name, teacher: teacher._id });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists for this teacher" });
    }

    // Create a new subject
    const subject = new Subject({
      name,
      teacher: teacher._id,
    });

    // Save the subject
    await subject.save();

    // Add the subject to the teacher's list of subjects
    teacher.subjects.push(subject._id);
    await teacher.save();

    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to get all subjects of a teacher
export const getAllSubjectsOfTeacher = async (req, res) => {
  const { teacherName } = req.params;

  try {
    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName }).populate("subjects");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Get the teacher's subjects
    const subjects = await Subject.find({ teacher: teacher._id });

    res.status(200).json({ message: "Subjects retrieved successfully", subjects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};