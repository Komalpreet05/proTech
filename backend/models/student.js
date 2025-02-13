import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // Student is linked to a specific teacher
  grade: { type: String, required: true },
  picture: { type: String }, 
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject" } // Connects students to subjects
  ],
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;