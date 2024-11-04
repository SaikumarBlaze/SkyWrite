import mongoose from "mongoose"; // imports the Mongoose library
import dotenv from "dotenv";

// Load environment variables from .env.local or .env
dotenv.config();
const mongoURI = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Export the function
export default connectToDatabase;
