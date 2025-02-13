import Observation from "../models/observation.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Teacher from "../models/teacher.js"


// Add a new student
export const addStudent = async (req, res) => {
  const { name, grade, picture, teacherName, subjects } = req.body;

  try {
    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if the subjects exist and are associated with the teacher
    const subjectIds = [];
    const subjectUpdatePromises = []; // To store the promises for updating subjects

    // Create the student first
    const student = new Student({
      name,
      grade,
      picture,
      teacher: teacher._id, // Link the student to the found teacher
    });

    // Save the student and get the student id
    await student.save();

    // Now that the student is created, we can add the student's id to subjects
    for (const subjectName of subjects) {
      const subject = await Subject.findOne({ name: subjectName, teacher: teacher._id });
      if (!subject) {
        return res.status(400).json({ message: `Subject '${subjectName}' not found or not associated with this teacher` });
      }

      subjectIds.push(subject._id);

      // Add the student's ObjectId to the subject's students list
      subject.students.push(student._id);  // Add the student to the subject's student list
      subjectUpdatePromises.push(subject.save());  // Add the save operation to the promises array
    }

    // Update the student's subjects with the found subjects
    student.subjects = subjectIds;

    // Save the updated student with subjects
    await student.save();

    // Wait for all the subject updates to finish
    await Promise.all(subjectUpdatePromises);

    // Return success message
    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Get all students associated with a specific teacher
export const getStudentsByTeacher = async (req, res) => {
  const { teacherName } = req.params; //  retrieve the teacher’s name passed in the URL.

  try {
    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find students associated with the teacher's ID
    const students = await Student.find({ teacher: teacher._id });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Get all observations by student

export const getObservationsByStudent = async (req, res) => {
  const { studentName } = req.params; //  retrieve the teacher’s name passed in the URL.

  try {
    // Find the teacher by name
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find observations associated with the student's ID
    const observations = await Observation.find({ student: student._id });

    res.status(200).json({ student, observations }

    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// lets create a student profile page which will show image of student profile in circle in centre top.
// below student name
// below this there should be a div containing observation made on students and soem grpahiscs
// below this there should be some plotes/visual graph with some metrics
// option to generate report on student performance and option to send email to parent


