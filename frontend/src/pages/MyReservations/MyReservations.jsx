import { useEffect, useState } from "react";
import { reservationTimes } from "../../utils/reservationConstants";
import { validateReservationUpdate } from "../../utils/validation";
import Popup from "../../components/Popup/Popup";
import "../../blocks/myReservations.css";

import {
  getReservations,
  deleteReservation,
  updateReservation,
} from "../../utils/reservations";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReservation, setEditingReservation] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editGuests, setEditGuests] = useState(2);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormErrors, setEditFormErrors] = useState({
    date: "",
    time: "",
    guests: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadReservations = async () => {
      const token = localStorage.getItem("jwt");

      try {
        setError("");

        const data = await getReservations(token);

        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadReservations();
  }, []);

  function closeDeletePopup() {
    setReservationToDelete(null);
    setDeleteError("");
  }

  async function handleDelete(reservationId) {
    const token = localStorage.getItem("jwt");

    try {
      setDeleteError("");
      setIsDeleting(true);

      await deleteReservation(reservationId, token);

      // setReservations((currentReservations) =>
      //   currentReservations.filter(
      //     (reservation) => reservation._id !== reservationId,
      //   ),
      // );

      setReservations((currentReservations) => {
        const remainingReservations = currentReservations.filter(
          (reservation) => {
            return reservation._id !== reservationId;
          },
        );

        return remainingReservations;
      });

      setReservationToDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  function closeEditPopup() {
    setEditingReservation(null);

    setEditFormErrors({
      date: "",
      time: "",
      guests: "",
    });

    setEditError("");
  }

  async function handleUpdate() {
    const validationErrors = validateReservationUpdate({
      date: editDate,
      time: editTime,
      guests: editGuests,
    });

    setEditFormErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) {
      return;
    }

    const token = localStorage.getItem("jwt");

    const updatedData = {
      date: editDate,
      time: editTime,
      guests: Number(editGuests),
    };

    try {
      setEditError("");
      setIsUpdating(true);

      const updatedReservation = await updateReservation(
        editingReservation._id,
        updatedData,
        token,
      );

      // console.log(updatedReservation);

      // setReservations((currentReservations) =>
      //   currentReservations.map((reservation) =>
      //     reservation._id === updatedReservation._id
      //       ? updatedReservation
      //       : reservation,
      //   ),
      // );

      setReservations((currentReservations) => {
        const newReservations = currentReservations.map((reservation) => {
          if (reservation._id === updatedReservation._id) {
            return updatedReservation;
          }

          return reservation;
        });

        return newReservations;
      });

      closeEditPopup();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <main className="my-reservations">
      <section className="my-reservations__intro">
        <p className="my-reservations__eyebrow">YOUR TABLES</p>

        <h1 className="my-reservations__title">
          Mis
          <br />
          reservaciones
        </h1>

        <p className="my-reservations__description">
          Consulta, modifica o cancela tus próximas visitas a Saade.
        </p>
      </section>

      {isLoading && (
        <p className="my-reservations__status">Cargando reservaciones...</p>
      )}

      {error && (
        <p className="my-reservations__status my-reservations__status_error">
          {error}
        </p>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="my-reservations__empty">
          <p className="my-reservations__empty-title">
            Todavía no tienes reservaciones.
          </p>

          <p className="my-reservations__empty-text">
            Cuando reserves una mesa, aparecerá aquí.
          </p>
        </div>
      )}

      {!isLoading && !error && reservations.length > 0 && (
        <section className="my-reservations__list">
          {reservations.map((reservation, index) => {
            const reservationDate = new Date(
              `${reservation.date.split("T")[0]}T00:00:00`,
            );

            const formattedDate = reservationDate.toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <article className="reservation-card" key={reservation._id}>
                <div className="reservation-card__number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="reservation-card__content">
                  <p className="reservation-card__eyebrow">RESERVATION</p>

                  <h2 className="reservation-card__name">{reservation.name}</h2>

                  <div className="reservation-card__details">
                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Fecha</span>

                      <span>{formattedDate}</span>
                    </div>

                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Hora</span>

                      <span>{reservation.time}</span>
                    </div>

                    <div className="reservation-card__detail">
                      <span className="reservation-card__label">Personas</span>

                      <span>{reservation.guests}</span>
                    </div>
                  </div>
                </div>

                <div className="reservation-card__actions">
                  <button
                    className="reservation-card__button reservation-card__button_edit"
                    type="button"
                    onClick={() => {
                      setEditError("");
                      setEditingReservation(reservation);
                      setEditDate(reservation.date.split("T")[0]);
                      setEditTime(reservation.time);
                      setEditGuests(reservation.guests);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="reservation-card__button reservation-card__button_cancel"
                    type="button"
                    onClick={() => {
                      setDeleteError("");
                      setReservationToDelete(reservation);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
      <Popup isOpen={reservationToDelete !== null} onClose={closeDeletePopup}>
        <div className="delete-popup">
          <p className="delete-popup__eyebrow">ARE YOU SURE?</p>

          <h2 className="delete-popup__title">
            Cancelar
            <br />
            reservación
          </h2>

          <p className="delete-popup__text">
            Esta acción eliminará tu reservación.
            <br />
            ¿Quieres continuar?
          </p>

          <div className="delete-popup__actions">
            <button
              className="delete-popup__button delete-popup__button_keep"
              type="button"
              onClick={closeDeletePopup}
            >
              No, conservar
            </button>

            <button
              className="delete-popup__button delete-popup__button_cancel"
              type="button"
              onClick={() => handleDelete(reservationToDelete._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Cancelando..." : "Sí, cancelar"}
            </button>
          </div>

          {deleteError && <p className="popup__error">{deleteError}</p>}
        </div>
      </Popup>
      <Popup isOpen={editingReservation !== null} onClose={closeEditPopup}>
        <div className="edit-reservation">
          <p className="edit-reservation__eyebrow">YOUR TABLE</p>

          <h2 className="edit-reservation__title">Editar reservación</h2>

          <div className="edit-reservation__form">
            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Fecha</span>

              <input
                className={`edit-reservation__input ${
                  editFormErrors.date ? "edit-reservation__input_error" : ""
                }`}
                type="date"
                min={today}
                value={editDate}
                onChange={(event) => setEditDate(event.target.value)}
              />

              {editFormErrors.date && (
                <span className="edit-reservation__error">
                  {editFormErrors.date}
                </span>
              )}
            </label>

            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Hora</span>

              <select
                className={`edit-reservation__input ${
                  editFormErrors.time ? "edit-reservation__input_error" : ""
                }`}
                value={editTime}
                onChange={(event) => setEditTime(event.target.value)}
              >
                {reservationTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              {editFormErrors.time && (
                <span className="edit-reservation__error">
                  {editFormErrors.time}
                </span>
              )}
            </label>

            <label className="edit-reservation__field">
              <span className="edit-reservation__label">Personas</span>

              <input
                className={`edit-reservation__input ${
                  editFormErrors.guests ? "edit-reservation__input_error" : ""
                }`}
                type="number"
                min="1"
                max="20"
                value={editGuests}
                onChange={(event) => setEditGuests(event.target.value)}
              />

              {editFormErrors.guests && (
                <span className="edit-reservation__error">
                  {editFormErrors.guests}
                </span>
              )}
            </label>

            {editError && (
              <p className="edit-reservation__error edit-reservation__error_general">
                {editError}
              </p>
            )}

            <div className="edit-reservation__actions">
              <button
                className="edit-reservation__button edit-reservation__button_secondary"
                type="button"
                onClick={closeEditPopup}
              >
                Cancelar
              </button>

              <button
                className="edit-reservation__button edit-reservation__button_primary"
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </main>
  );
}

export default MyReservations;
