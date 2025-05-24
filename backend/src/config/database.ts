import mongoose from "mongoose";

export const setupDatabase = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/grocery-inventory";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
