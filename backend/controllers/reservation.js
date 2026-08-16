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

export default { createReservation };
