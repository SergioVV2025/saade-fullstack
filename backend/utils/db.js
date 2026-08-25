import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado correctamente a MongoDB!!!");
  } catch {
    console.log("Error conectándose a la DB!!!");
  }
};

export default connectDB;
