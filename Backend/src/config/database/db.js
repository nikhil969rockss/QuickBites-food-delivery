import mongoose from "mongoose";
import logger from "../logger.js";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Data base connection error ${error}`);
    process.exit(1);
  }
}

export default connectDB;
