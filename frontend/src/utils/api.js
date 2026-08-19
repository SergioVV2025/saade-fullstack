const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const CITY = "Los Angeles";

function getEvents(keyword) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    city: CITY,
    keyword: keyword || "",
  });

  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      return res.json();
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export { getEvents };
