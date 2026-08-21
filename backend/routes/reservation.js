import express from "express";
const router = express.Router();
import controllers from "../controllers/reservation.js";

router.post("/reservations", controllers.createReservation);
router.get("/reservations", controllers.getReservations);
router.delete("/reservations/:reservationId", controllers.deleteReservation);

export default router;
