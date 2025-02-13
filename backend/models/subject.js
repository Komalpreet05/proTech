import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the subject (e.g., "Math")
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // Teacher teaching the subject
  students: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student" } // Students enrolled in the subject
  ],
  createdAt: { type: Date, default: Date.now },
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;

