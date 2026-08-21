import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import reservations from "./routes/reservation.js";
import users from "./routes/users.js";
import connectDB from "./utils/db.js";
import auth from "./middlewares/auth.js";

const { PORT = 3001 } = process.env;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", users);

app.use(auth);

app.use("/", reservations);

// Futuras rutas privadas aquí
// app.use("/me", protectedUserRoutes);
// app.use("/my-reservations", protectedReservations);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
