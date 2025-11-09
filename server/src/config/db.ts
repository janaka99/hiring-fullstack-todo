import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log("MongoDB connectedd");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
