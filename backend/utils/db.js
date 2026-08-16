import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/reservations");
    console.log("Conectado correctamente a MongoDB!!!");
  } catch (error) {
    // console.log("Error conectándose a la DB:", err.message);
    console.log("Error conectándose a la DB!!!");
  }
};

export default connectDB;
