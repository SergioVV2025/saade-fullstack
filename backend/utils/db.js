import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado correctamente a MongoDB!!!");
  } catch (error) {
    console.log("Error conectándose a la DB!!!");
  }
};

export default connectDB;
