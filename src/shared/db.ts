import mongoose, { Connection } from "mongoose";
import { env } from "./env";

const MONGO_URI = env.MONGO_DB;
if (!MONGO_URI || typeof MONGO_URI !== "string" || MONGO_URI.length === 0) {
  throw new Error("Missing databse connection uri!!");
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = {
    connection: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { dbName: "agentic_rag_vectordb" })
      .then((mongoose) => mongoose.connection);
  }
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.connection = null;
    throw error;
  }
  return cached.connection;
}
