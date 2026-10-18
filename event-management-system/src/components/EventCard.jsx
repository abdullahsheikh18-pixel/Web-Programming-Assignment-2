import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function formatDate(date, time) {
  if (!date) return 'Date to be announced';
  const parsed = new Date(`${date}T${time || '12:00:00'}`);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(parsed);
}

export default function EventCard({ event }) {
  const locationParts = [event.venue, event.city, event.state].filter(Boolean).join(' · ');

  return (
    <article className="event-card">
      <Link to={`/events/${event.id}`} className="event-image-wrap">
        {event.image ? (
          <img src={event.image} alt={event.name} loading="lazy" />
        ) : (
          <div className="image-placeholder">
            <CalendarDays size={36} />
          </div>
        )}
        <span className="category-pill">{event.category}</span>
        <span className="image-arrow">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      <div className="event-card-body">
        <div className="event-date">
          <CalendarDays size={14} />
          {formatDate(event.date, event.time)}
        </div>

        <h3>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </h3>

        <p className="event-location">
          <MapPin size={15} />
          {locationParts || 'Location TBA'}
        </p>

        <div className="event-card-footer">
          <span className="event-type">{event.genre || event.category}</span>
          <Link to={`/events/${event.id}`} className="text-link">
            Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}