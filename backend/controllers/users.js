import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Datos de usuario inválidos." });
    }
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado." });
    }
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Correo y/o contraseña incorrectos!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Correo y/o contraseña incorrectos!",
      });
    }

    const token = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Bienvenido!",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

export default { createUser, login, getCurrentUser };
