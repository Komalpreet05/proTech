import Teacher from "../models/teacher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Subject from "../models/subject.js";

const JWT_SECRET = "your-secret-key"; 
// Register a new teacher
export const registerTeacher = async (req, res) => {
  const { name, email, password, subjects } = req.body;

  try {
    // Check if the teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new teacher
    const teacher = new Teacher({ name, email, password: hashedPassword, subjects: [] });
    await teacher.save();

    // Find or create subjects for the teacher
    if (subjects.length > 0) {
    const subjectIds = [];
    for (const subjectName of subjects) {
      // Create a new subject associated with the teacher
      const subject = new Subject({
        name: subjectName,
        teacher: teacher._id, // Associate this subject with the current teacher
      });
      await subject.save();

      // Add the subject ID to the array
      subjectIds.push(subject._id);
    }
  

    // Update the teacher's subjects field with the newly created subjects
    teacher.subjects = subjectIds;
    await teacher.save();
  }
    // res.status(200).json({ message: "Teacher registered successfully" });
    res.status(200).json({ 
      message: "Teacher registered successfully", 
      teacher: {
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subjects: teacher.subjects
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: teacher._id, name: teacher.name, email: teacher.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Set token in HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,  // Cookie cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production",  // Use HTTPS in production
      maxAge: 3600 * 1000,  // 1 hour
      sameSite: "Strict",  // Helps with CSRF protection
    });

    res.status(200).json({ message: "Login successful", teacher });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateTeacherSubjects = async (req, res) => {
  const { teacherName, subjectName } = req.body;

  try {
    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if the subject already exists for this teacher
    let subject = await Subject.findOne({ name: subjectName, teacher: teacher._id });
    if (!subject) {
      // Create a new subject if it doesn't exist
      subject = new Subject({
        name: subjectName,
        teacher: teacher._id,
      });
      await subject.save();
    }

    // Add the subject to the teacher's list if not already added
    if (!teacher.subjects.includes(subject._id)) {
      teacher.subjects.push(subject._id);
      await teacher.save();
    }

    res.status(200).json({ message: "Subject updated successfully", subjects: teacher.subjects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};