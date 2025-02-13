import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // Make it sparse to allow null/undefined values
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email should always be unique
  password: { type: String, required: function () { return !this.googleId; } }, // Required if googleId is not present
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject" } // Connects teachers to subjects Array of subjects the teacher teaches
  ],
  createdAt: { type: Date, default: Date.now },
});

// Use sparse to avoid index conflicts with null or undefined googleId
teacherSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;