import { useEffect, useState } from "react";
import { reservationTimes } from "../../utils/reservationConstants";

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

  async function handleDelete(reservationId) {
    const token = localStorage.getItem("jwt");

    try {
      setError("");

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
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate() {
    const token = localStorage.getItem("jwt");

    const updatedData = {
      date: editDate,
      time: editTime,
      guests: Number(editGuests),
    };

    try {
      setError("");

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

      setEditingReservation(null);
    } catch (err) {
      setError(err.message);
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
                setEditingReservation(reservation);
                setEditDate(reservation.date);
                setEditTime(reservation.time);
                setEditGuests(reservation.guests);
              }}
            >
              Editar
            </button>
            <button type="button" onClick={() => handleDelete(reservation._id)}>
              Cancelar
            </button>
            {editingReservation?._id === reservation._id && (
              <div>
                <label>
                  Fecha:
                  <input
                    type="date"
                    min={today}
                    value={editDate}
                    onChange={(event) => setEditDate(event.target.value)}
                  />
                </label>

                <label className="reservation__label" htmlFor="time">
                  Hora
                </label>
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

                <label>
                  Personas:
                  <input
                    type="number"
                    min="1"
                    value={editGuests}
                    onChange={(event) => setEditGuests(event.target.value)}
                  />
                </label>
                <button type="button" onClick={handleUpdate}>
                  Guardar
                </button>
              </div>
            )}
          </article>
        ))}
    </main>
  );
}

export default MyReservations;
