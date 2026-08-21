import Reservation from "../models/reservation.js";

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    // Validar los datos de entrada
    // if (!name || !email || !phone || !date || !time || !guests) {
    //   return res.status(400).json({ message: "Todos los campos son obligatorios." });
    // }

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
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ owner: req.user._id });
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error al obtener las reservas:", err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(
      req.params.reservationId,
    ).orFail();

    if (String(reservation.owner) !== String(req.user._id)) {
      return res.status(403).json({
        message: "No tienes permiso para cancelar esta reserva.",
      });
    }

    await Reservation.findByIdAndDelete(req.params.reservationId).orFail();

    return res.status(200).json({
      message: "Reserva cancelada correctamente.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "ID de reserva inválido." });
    }

    if (err.name === "DocumentNotFoundError") {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
};

export default { createReservation, getReservations, deleteReservation };
