import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email inválido!",
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", userSchema);
