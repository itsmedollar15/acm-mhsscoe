import mongoose from "mongoose";

// Asynchronous function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message on successful connection
    console.log("Database Connected Successfully");
  } catch (error) {
    // Log any connection error to the console
    console.log(error);
  }
};
