import Reservation from "../models/reservation.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../errors/index.js";

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
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Datos de reserva inválidos."));
    }

    next(err);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ owner: req.user._id });
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      throw new ForbiddenError("No tienes permiso para cancelar esta reserva.");
    }

    await Reservation.findByIdAndDelete(req.params.reservationId).orFail();

    return res.status(200).json({
      message: "Reserva cancelada correctamente.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("ID de reserva inválido."));
    }

    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Reserva no encontrada."));
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
      throw new ForbiddenError(
        "No tienes permiso para actualizar esta reserva.",
      );
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
      return next(new BadRequestError("ID de reserva inválido."));
    }

    if (err.name === "ValidationError") {
      return next(new BadRequestError("Datos de reserva inválidos."));
    }

    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Reserva no encontrada."));
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
