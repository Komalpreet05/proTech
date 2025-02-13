
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import Teacher from '../models/teacher.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback', // Change for production
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for the teacher by email first (to avoid duplicates)
        let teacher = await Teacher.findOne({ email: profile.emails[0].value });

        if (!teacher) {
          // If no teacher exists with the email, check by Google ID (fallback)
          teacher = await Teacher.findOne({ googleId: profile.id });

          if (!teacher) {
            // Create a new teacher entry
            teacher = new Teacher({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              subjects: [], // Empty or populate later
              createdAt: new Date(),
            });
            await teacher.save();
          }
        } else if (!teacher.googleId) {
          // If a teacher with the email exists but does not have a Google ID, update the record
          teacher.googleId = profile.id;
          await teacher.save();
        }

        return done(null, teacher);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// ✅ Fix: Serialize only the user ID, not the entire object
passport.serializeUser((user, done) => {
  done(null, user.id); // Only store the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Teacher.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});