import { useEffect, useState } from "react";
import { getEvents } from "../../utils/api";
import EventCard from "../../components/EventCard/EventCard";
import Preloader from "../../components/Preloader/Preloader";
import SearchForm from "../../components/SearchForm/SearchForm";

function Explore() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(3);

  async function loadEvents(keyword = "") {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getEvents(keyword);
      setEvents(data._embedded?.events || []);
    } catch (err) {
      setError(err);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleSearch(keyword) {
    setVisibleEvents(3);
    loadEvents(keyword);
  }

  return (
    <main className="explore">
      <h1 className="explore__title">Explore</h1>
      <p className="explore__subtitle">
        What&apos;s happening around Los Angeles?
      </p>

      {isLoading && <Preloader />}
      {/* {true && <Preloader />} */}

      <SearchForm onSearch={handleSearch} />

      {!isLoading && error && (
        <p className="explore__error">
          Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
          haya un problema de conexión o que el servidor no funcione. Por favor,
          inténtalo más tarde.
        </p>
      )}

      {!isLoading && !error && events.length === 0 && (
        <p className="explore__empty">No se ha encontrado nada</p>
      )}

      {!isLoading && !error && events.length > 0 && (
        <section className="explore__results">
          {events.slice(0, visibleEvents).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      )}

      {visibleEvents < events.length && (
        <button
          className="explore__more-button"
          type="button"
          onClick={() => setVisibleEvents(visibleEvents + 3)}
        >
          Mostrar más
        </button>
      )}
    </main>
  );
}

export default Explore;
