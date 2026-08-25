import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./utils/db.js";
import { PORT } from "./utils/config.js";

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const shutdown = async () => {
  console.log("Cerrando servidor...");

  await mongoose.connection.close();

  server.close(() => {
    console.log("Servidor cerrado correctamente.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
