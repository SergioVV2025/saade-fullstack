const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createReservation = async (reservationData, token) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

const deleteReservation = async (reservationId, token) => {
  const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo borrar la reserva.");
  }

  return data;
};

const updateReservation = async (reservationId, data, token) => {
  const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const newData = await response.json();

  if (!response.ok) {
    throw new Error(newData.message || "No se pudo actualizar la reserva.");
  }

  return newData;
};

export {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation,
};
