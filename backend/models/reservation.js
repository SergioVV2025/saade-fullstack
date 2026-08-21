import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // return emailPattern.test(value);
        return validator.isEmail(value);
      },
      message: "Email inválido!",
    },
  },

  phone: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default mongoose.model("reservation", reservationSchema);
