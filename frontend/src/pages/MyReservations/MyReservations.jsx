import { useEffect, useState } from "react";
import { reservationTimes } from "../../utils/reservationConstants";
import { validateReservationUpdate } from "../../utils/validation";
import Popup from "../../components/Popup/Popup";

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
    <main>
      <h1>Mis reservaciones</h1>

      {isLoading && <p>Cargando reservaciones...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && reservations.length === 0 && (
        <p>No tienes reservaciones.</p>
      )}

      {!isLoading &&
        !error &&
        reservations.map((reservation) => (
          <article key={reservation._id}>
            <h2>{reservation.name}</h2>
            <p>Fecha: {reservation.date}</p>
            <p>Hora: {reservation.time}</p>
            <p>Personas: {reservation.guests}</p>
            <button
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
              type="button"
              onClick={() => {
                setDeleteError("");
                setReservationToDelete(reservation);
              }}
            >
              Cancelar
            </button>
          </article>
        ))}
      <Popup isOpen={reservationToDelete !== null} onClose={closeDeletePopup}>
        <h2>Cancelar reservación</h2>

        <p>¿Seguro que quieres cancelar esta reservación?</p>

        <button type="button" onClick={closeDeletePopup}>
          No, conservar
        </button>

        <button
          type="button"
          onClick={() => handleDelete(reservationToDelete._id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Cancelando..." : "Sí, cancelar"}
        </button>
        {deleteError && <p className="popup__error">{deleteError}</p>}
      </Popup>
      <Popup isOpen={editingReservation !== null} onClose={closeEditPopup}>
        <h2>Editar reservación</h2>

        <label>
          Fecha:
          <input
            type="date"
            min={today}
            value={editDate}
            onChange={(event) => setEditDate(event.target.value)}
          />
        </label>
        {editFormErrors.date && (
          <p className="popup__error">{editFormErrors.date}</p>
        )}

        <label>
          Hora:
          <select
            value={editTime}
            onChange={(event) => setEditTime(event.target.value)}
          >
            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        {editFormErrors.time && (
          <p className="popup__error">{editFormErrors.time}</p>
        )}

        <label>
          Personas:
          <input
            type="number"
            min="1"
            max="20"
            value={editGuests}
            onChange={(event) => setEditGuests(event.target.value)}
          />
        </label>
        {editFormErrors.guests && (
          <p className="popup__error">{editFormErrors.guests}</p>
        )}

        <button type="button" onClick={closeEditPopup}>
          Cancelar
        </button>

        <button type="button" onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? "Guardando..." : "Guardar"}
        </button>
        {editError && <p className="popup__error">{editError}</p>}
      </Popup>
    </main>
  );
}

export default MyReservations;
