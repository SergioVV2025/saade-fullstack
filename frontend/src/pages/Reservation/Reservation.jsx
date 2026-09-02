import { useState } from "react";
import {
  validateText,
  validateEmail,
  validateForm,
} from "../../utils/validation";
import Popup from "../../components/Popup/Popup";
import { createReservation } from "../../utils/reservations.js";
import { reservationTimes } from "../../utils/reservationConstants";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [reservationError, setReservationError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let error = "";

    if (name === "name") {
      error = validateText({
        value,
        fieldName: "Nombre",
        minLength: 2,
        maxLength: 40,
      });
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "phone" && !value.trim()) {
      error = "El teléfono es obligatorio.";
    }

    if (name === "date" && !value) {
      error = "La fecha es obligatoria.";
    }

    if (name === "time" && !value) {
      error = "La hora es obligatoria.";
    }

    if (name === "guests") {
      const guests = Number(value);

      if (!value) {
        error = "Indica el número de personas.";
      } else if (guests < 1 || guests > 20) {
        error = "El número de personas debe estar entre 1 y 20.";
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm(formData);

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      setReservationError("");
      setIsCreating(true);

      const token = localStorage.getItem("jwt");

      await createReservation(formData, token);

      setConfirmedReservation(formData);
      setIsConfirmationOpen(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
      });
    } catch (error) {
      setReservationError(error.message);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <main className="reservation-page">
      <section className="reservation-page__intro">
        <p className="reservation-page__eyebrow">Come hang</p>
        <h1 className="reservation-page__title">Reserve your table</h1>
        <p className="reservation-page__description">
          Pick a date, bring your people, we&apos;ll take care of the rest.
        </p>
      </section>

      <form className="reservation" onSubmit={handleSubmit} noValidate>
        <div className="reservation__field">
          <label className="reservation__label" htmlFor="name">
            Nombre
          </label>
          <input
            className={`reservation__input ${
              errors.name ? "reservation__input_error" : ""
            }`}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
          <span className="reservation__error">{errors.name}</span>
        </div>

        <div className="reservation__field">
          <label className="reservation__label" htmlFor="email">
            Email
          </label>
          <input
            className={`reservation__input ${
              errors.email ? "reservation__input_error" : ""
            }`}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
          <span className="reservation__error">{errors.email}</span>
        </div>

        <div className="reservation__field">
          <label className="reservation__label" htmlFor="phone">
            Teléfono
          </label>
          <input
            className={`reservation__input ${
              errors.phone ? "reservation__input_error" : ""
            }`}
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Tu teléfono"
            required
          />
          <span className="reservation__error">{errors.phone}</span>
        </div>

        <div className="reservation__field">
          <label className="reservation__label" htmlFor="date">
            Fecha
          </label>
          <input
            className={`reservation__input ${
              errors.date ? "reservation__input_error" : ""
            }`}
            id="date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            required
          />
          <span className="reservation__error">{errors.date}</span>
        </div>

        <div className="reservation__field">
          <label className="reservation__label" htmlFor="time">
            Hora
          </label>
          <select
            className={`reservation__select ${
              errors.time ? "reservation__input_error" : ""
            }`}
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una hora</option>

            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <span className="reservation__error">{errors.time}</span>
        </div>

        <div className="reservation__field">
          <label className="reservation__label" htmlFor="guests">
            Número de personas
          </label>
          <input
            className={`reservation__input ${
              errors.guests ? "reservation__input_error" : ""
            }`}
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="20"
            onKeyDown={(e) => e.preventDefault()}
            value={formData.guests}
            onChange={handleChange}
            required
          />
          <span className="reservation__error">{errors.guests}</span>
        </div>

        <button
          className="reservation__button"
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? "Reservando..." : "Reservar"}
        </button>
        {reservationError && (
          <p className="reservation__error">{reservationError}</p>
        )}
      </form>

      <Popup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <h2>¡Reserva confirmada!</h2>
        <p>Nombre: {confirmedReservation?.name}</p>
        <p>Fecha: {confirmedReservation?.date}</p>
        <p>Hora: {confirmedReservation?.time}</p>
        <p>Personas: {confirmedReservation?.guests}</p>
      </Popup>
    </main>
  );
}

export default Reservation;
