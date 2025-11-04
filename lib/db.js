import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/register";

if (!MONGO_URL) {
  throw new Error("Please add your Mongo URI to mongodb.ts");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URL);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB Connected:", db.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}
