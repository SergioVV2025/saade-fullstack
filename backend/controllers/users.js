import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Datos de usuario inválidos."));
    }

    if (err.code === 11000) {
      return next(
        new ConflictError("El correo electrónico ya está registrado."),
      );
    }

    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Correo y/o contraseña incorrectos!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError("Correo y/o contraseña incorrectos!");
    }

    const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Bienvenido!",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Usuario no encontrado."));
    }

    next(err);
  }
};

export default { createUser, login, getCurrentUser };
