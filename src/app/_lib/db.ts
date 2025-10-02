"use server";

import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sg90883:random@cluster0.nuf8fxj.mongodb.net/anisensei";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
