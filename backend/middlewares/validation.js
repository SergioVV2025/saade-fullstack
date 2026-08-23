import validator from "validator";
import mongoose from "mongoose";

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
  const { name, email, guests } = req.body;

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
