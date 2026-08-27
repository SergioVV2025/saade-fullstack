import { useEffect, useState } from "react";

import { getReservations } from "../../utils/reservations";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
          </article>
        ))}
    </main>
  );
}

export default MyReservations;
