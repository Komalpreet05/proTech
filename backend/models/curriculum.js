import mongoose from "mongoose";

const curriculumSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  metrics: [{ type: String }], // Array of metrics to evaluate (e.g., "Critical Thinking", "Teamwork")
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Curriculum = mongoose.model("Curriculum", curriculumSchema);
export default Curriculum;