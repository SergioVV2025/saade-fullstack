import validator from "validator";
import mongoose from "mongoose";

const reservationTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const validateSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .send({ message: "Todos los campos son obligatorios!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Correo electrónico inválido!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Las contraseñas no coinciden!" });
  }

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    return res.status(400).send({
      message: "El nombre debe tener entre 2 y 30 caracteres.",
    });
  }

  next();
};

const validateSignin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Todos los campos son obligatorios!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Correo electrónico inválido!" });
  }

  next();
};

function validateReservationId(req, res, next) {
  // const reservationId = req.params.reservationId;
  const { reservationId } = req.params;

  if (!mongoose.isValidObjectId(reservationId)) {
    return res.status(400).send({ message: "ID de reserva inválido!" });
  }

  next();
}

const validateReservation = (req, res, next) => {
  const { name, email, phone, date, time, guests } = req.body;
  const today = new Date().toISOString().split("T")[0];

  if (!name || !email || !phone || !date || !time || guests === undefined) {
    return res.status(400).send({
      message: "Todos los campos de la reserva son obligatorios!",
    });
  }

  if (!validator.isLength(name, { min: 2, max: 40 })) {
    return res.status(400).send({
      message: "El nombre debe tener entre 2 y 40 caracteres.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      message: "Correo electrónico inválido!",
    });
  }

  if (date < today) {
    return res.status(400).send({
      message: "La fecha no puede ser anterior a hoy.",
    });
  }

  if (!reservationTimes.includes(time)) {
    return res.status(400).send({
      message: "El horario seleccionado no es válido.",
    });
  }

  const guestsNumber = Number(guests);

  if (
    !Number.isInteger(guestsNumber) ||
    guestsNumber < 1 ||
    guestsNumber > 20
  ) {
    return res.status(400).send({
      message: "El número de personas debe estar entre 1 y 20.",
    });
  }

  next();
};

const validateReservationUpdate = (req, res, next) => {
  const { name, email, date, time, guests } = req.body;
  const today = new Date().toISOString().split("T")[0];

  if (name !== undefined && !validator.isLength(name, { min: 2, max: 40 })) {
    return res.status(400).send({
      message: "El nombre debe tener entre 2 y 40 caracteres.",
    });
  }

  if (email !== undefined && !validator.isEmail(email)) {
    return res.status(400).send({
      message: "Correo electrónico inválido!",
    });
  }

  if (date !== undefined) {
    if (date < today) {
      return res.status(400).send({
        message: "La fecha no puede ser anterior a hoy.",
      });
    }
  }

  if (time !== undefined && !reservationTimes.includes(time)) {
    return res.status(400).send({
      message: "El horario seleccionado no es válido.",
    });
  }

  if (guests !== undefined) {
    const guestsNumber = Number(guests);

    if (
      !Number.isInteger(guestsNumber) ||
      guestsNumber < 1 ||
      guestsNumber > 20
    ) {
      return res.status(400).send({
        message: "El número de personas debe estar entre 1 y 20.",
      });
    }
  }
  next();
};

export {
  validateSignup,
  validateSignin,
  validateReservationId,
  validateReservation,
  validateReservationUpdate,
};
