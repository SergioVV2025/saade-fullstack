import { reservationTimes } from "./reservationConstants";

export function validateText({ value, fieldName, minLength, maxLength }) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldName} es obligatorio.`;
  }

  if (trimmedValue.length < minLength) {
    return `${fieldName} debe tener al menos ${minLength} caracteres.`;
  }

  if (trimmedValue.length > maxLength) {
    return `${fieldName} no puede tener más de ${maxLength} caracteres.`;
  }

  return "";
}

export function validateEmail(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "El email es obligatorio.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmedValue)) {
    return "Introduce un email válido.";
  }

  return "";
}

export function validateForm(formData) {
  const today = new Date().toISOString().split("T")[0];
  const errors = {
    name: validateText({
      value: formData.name,
      fieldName: "Nombre",
      minLength: 2,
      maxLength: 40,
    }),

    email: validateEmail(formData.email),

    phone: formData.phone.trim() ? "" : "El teléfono es obligatorio.",

    date: !formData.date
      ? "La fecha es obligatoria."
      : formData.date < today
        ? "La fecha no puede ser anterior a hoy."
        : "",

    time: !formData.time
      ? "La hora es obligatoria."
      : !reservationTimes.includes(formData.time)
        ? "Selecciona un horario válido."
        : "",

    guests: !formData.guests
      ? "Indica el número de personas."
      : Number(formData.guests) < 1 || Number(formData.guests) > 20
        ? "El número de personas debe estar entre 1 y 20."
        : "",
  };

  return errors;
}
