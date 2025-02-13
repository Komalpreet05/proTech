import { connect } from "mongoose";
import { config as dotenvConfig } from "dotenv";


dotenvConfig();

const connectDB = async () => {
  try {
    
    const conn = await connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
