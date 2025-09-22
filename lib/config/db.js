import mongoose from "mongoose";

let isConnected = false; 

export const ConnectDB = async () => {
  if (isConnected) {
    console.log("⚡ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(
      "mongodb+srv://shivamkumarg1997_db_user:Shivam@1998@cluster0.zu42skv.mongodb.net/blog-app",
      { dbName: "blog-app" }
    );

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
