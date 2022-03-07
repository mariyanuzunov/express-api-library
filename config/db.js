import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
