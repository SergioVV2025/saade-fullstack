import Reservation from "../models/reservation.js";

const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    const newReservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests,
      owner: req.user._id,
    });
    res.status(201).json({
      name: newReservation.name,
      email: newReservation.email,
      phone: newReservation.phone,
      date: newReservation.date,
      time: newReservation.time,
      guests: newReservation.guests,
    });
  } catch (err) {
    console.error("Error al crear la reserva:", err);
    if (err.name === "ValidationError") {
      err.statusCode = 400;
      err.message = "Datos de reserva inválidos.";
    }

    next(err);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ owner: req.user._id });
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error al obtener las reservas:", err);

    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      const error = new Error("No tienes permiso para cancelar esta reserva.");
      error.statusCode = 403;
      throw error;
    }

    await Reservation.findByIdAndDelete(req.params.reservationId).orFail();

    return res.status(200).json({
      message: "Reserva cancelada correctamente.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      err.statusCode = 400;
      err.message = "ID de reserva inválido.";
    } else if (err.name === "DocumentNotFoundError") {
      err.statusCode = 404;
      err.message = "Reserva no encontrada.";
    }

    next(err);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      const error = new Error(
        "No tienes permiso para actualizar esta reserva.",
      );
      error.statusCode = 403;
      throw error;
    }

    const allowedUpdates = ["name", "email", "phone", "date", "time", "guests"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      updates,
      { new: true, runValidators: true },
    ).orFail();

    return res.status(200).json(updatedReservation);
  } catch (err) {
    if (err.name === "CastError") {
      err.message = "ID de reserva inválido.";
      err.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      err.message = "Datos de reserva inválidos.";
      err.statusCode = 400;
    }

    if (err.name === "DocumentNotFoundError") {
      err.message = "Reserva no encontrada.";
      err.statusCode = 404;
    }

    next(err);
  }
};

export default {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation,
};
