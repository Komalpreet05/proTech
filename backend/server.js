import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import observationRoutes from "./routes/observationRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import session from "express-session";
import passport from "passport";
import "./config/passportSetup.js";

import {
  googleAuth,
  googleCallback,
  profile,
} from "./controllers/authController.js";

dotenvConfig();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // to parse incoming request with JSON payloads
// app.use(cors());   // to enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND, // Specify the origin of your frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

import connectDB from "./config/db.js";
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes for Google OAuth
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleCallback);
app.get("/profile", profile);

// Routes placeholder (add your routes here later)

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/subjects", subjectRoutes);

// const PORT = process.env.PORT || 6000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

export default app;

// If you need both local dev and Vercel:
// if (process.env.NODE_ENV !== "production") {
//   app.listen(process.env.PORT);
// }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
