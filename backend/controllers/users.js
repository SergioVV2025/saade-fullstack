import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      _id: newUser._id,
    });
  } catch (err) {
    console.error("Error al crear la usuario:", err);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email: email }).select("+password");
    if (userEmail) {
      const isMatch = await bcrypt.compare(password, userEmail.password);
      if (!isMatch) {
        const error = new Error("Correo y/o contraseña incorrectos!");
        return res.status(401).json({ success: false, message: error.message });
      }
      const token = jsonwebtoken.sign(
        { _id: userEmail._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );
      return res
        .status(200)
        .json({ success: true, message: "Bienvenido!", token: token });
    } else {
      const error = new Error("Correo y/o contraseña incorrectos!");
      return res.status(401).json({ success: false, message: error.message });
    }
  } catch (err) {
    if (!err.statusCode) {
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor." });
    }
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
};

export default { createUser, login };
