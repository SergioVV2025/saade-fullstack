const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createReservation = async (reservationData, token) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reservationData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear la reserva.");
  }

  return data;
};

const getReservations = async (token) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener las reservas.");
  }

  return data;
};

export { createReservation, getReservations };
