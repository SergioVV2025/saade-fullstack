import express from "express";
const router = express.Router();

import controllers from "../controllers/reservation.js";

import {
  validateReservationId,
  validateReservation,
  validateReservationUpdate,
} from "../middlewares/validation.js";

import auth from "../middlewares/auth.js";
router.use(auth);

router.post(
  "/reservations",
  validateReservation,
  controllers.createReservation,
);

router.get("/reservations", controllers.getReservations);

router.delete(
  "/reservations/:reservationId",
  validateReservationId,
  controllers.deleteReservation,
);

router.patch(
  "/reservations/:reservationId",
  validateReservationId,
  validateReservationUpdate,
  controllers.updateReservation,
);

export default router;
