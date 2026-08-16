function EventCard({ event }) {
  const image = event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0]?.name;
  const date = event.dates?.start?.localDate;
  const url = event.url;

  return (
    <article className="event-card">
      {image && (
        <img className="event-card__image" src={image} alt={event.name} />
      )}

      <div className="event-card__content">
        <h2 className="event-card__title">{event.name}</h2>

        {date && <p className="event-card__date">{date}</p>}
        {venue && <p className="event-card__venue">{venue}</p>}

        {url && (
          <a
            className="event-card__link"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Ver evento
          </a>
        )}
      </div>
    </article>
  );
}

export default EventCard;
