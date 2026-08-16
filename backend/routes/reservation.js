import express from "express";
const router = express.Router();
import controllers from "../controllers/reservation.js";

router.post("/reservations", controllers.createReservation);

export default router;
