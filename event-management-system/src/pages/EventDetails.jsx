import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, Clock3, MapPin, Ticket, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../api/ticketmaster';
import { eventsFailed, eventsReceived, eventsRequested } from '../features/events/eventsSlice';
import { registerForEvent } from '../features/registrations/registrationsSlice';
import { formatDate } from '../components/EventCard';

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ALL HOOKS MUST BE DECLARED TOP-LEVEL HERE AT THE START
  const user = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events.items);
  const { status, error } = useSelector((state) => state.events);
  const registrations = useSelector((state) => state.registrations.items);

  const [notice, setNotice] = useState('');

  // Find event cleanly from Redux store state
  const event = events.find((item) => item.id === id);

  useEffect(() => {
    if (!event) {
      dispatch(eventsRequested());
      fetchEventById(id)
        .then((result) => {
          dispatch(eventsReceived([result, ...events.filter((item) => item.id !== result.id)]));
        })
        .catch((err) => {
          dispatch(eventsFailed(err.message));
        });
    }
  }, [id, event, dispatch, events]);

  const isRegistered =
    user && registrations.some((item) => item.eventId === id && item.userEmail === user.email);

  function register() {
    if (!user) return;
    if (isRegistered) {
      setNotice('You are already registered for this event.');
      return;
    }

    dispatch(
      registerForEvent({
        eventId: id,
        userEmail: user.email,
        eventName: event.name,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        eventCity: event.city,
        eventImage: event.image,
        eventCategory: event.category,
        eventUrl: event.url,
      })
    );
    setNotice('You’re on the list! Your registration has been saved.');
  }

  if (!event && status === 'loading') {
    return (
      <main className="page-shell">
        <div className="state-panel">
          <div className="spinner" />
          <h3>Loading event details…</h3>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page-shell">
        <div className="state-panel">
          <AlertCircle size={30} />
          <h3>Event not found</h3>
          <p>{error || 'This event may no longer be available.'}</p>
          <Link className="button button-dark" to="/events">
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  const formattedTime = event.time
    ? new Date(`2000-01-01T${event.time}`).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Time TBA';

  return (
    <main className="page-shell detail-page">
      <Link to="/events" className="back-link">
        <ArrowLeft size={16} /> Back to explore
      </Link>

      <div className="detail-layout">
        <section className="detail-main">
          <div className="detail-hero-image">
            {event.image ? (
              <img src={event.image} alt={event.name} />
            ) : (
              <div className="image-placeholder">
                <CalendarDays size={50} />
              </div>
            )}
            <span className="category-pill">{event.category}</span>
          </div>

          <div className="detail-copy">
            <div className="eyebrow eyebrow-dark">THE DETAILS</div>
            <h1>{event.name}</h1>
            <p className="detail-subtitle">
              {event.genre || event.category} {event.city ? `· ${event.city}` : ''}
            </p>

            {event.info && (
              <div className="event-info">
                <h3>About this event</h3>
                <p>{event.info}</p>
              </div>
            )}

            <div className="detail-info-grid">
              <div>
                <span className="detail-info-icon">
                  <CalendarDays size={19} />
                </span>
                <span>
                  <small>DATE</small>
                  <b>{formatDate(event.date, event.time)}</b>
                </span>
              </div>

              <div>
                <span className="detail-info-icon">
                  <Clock3 size={19} />
                </span>
                <span>
                  <small>TIME</small>
                  <b>{formattedTime}</b>
                </span>
              </div>

              <div>
                <span className="detail-info-icon">
                  <MapPin size={19} />
                </span>
                <span>
                  <small>VENUE</small>
                  <b>{event.venue}</b>
                  <small>{[event.city, event.state, event.country].filter(Boolean).join(', ')}</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="registration-card">
          <span className="registration-icon">
            <Ticket size={22} />
          </span>
          <div className="eyebrow eyebrow-dark">MAKE IT HAPPEN</div>
          <h2>Save your spot.</h2>
          <p>Register here to keep this event in your personal list.</p>

          {notice && (
            <div className={`notice ${notice.startsWith('You’re') ? 'notice-success' : ''}`}>
              <CheckCircle2 size={16} />
              {notice}
            </div>
          )}

          {user ? (
            <button
              className="button button-primary button-full"
              onClick={register}
              disabled={!!isRegistered}
            >
              {isRegistered ? (
                <>
                  <CheckCircle2 size={17} /> Registered
                </>
              ) : (
                <>
                  <Ticket size={17} /> Register for event
                </>
              )}
            </button>
          ) : (
            <Link
              to="/login"
              state={{ from: `/events/${id}` }}
              className="button button-primary button-full"
            >
              Log in to register
            </Link>
          )}

          {event.url && (
            <a className="external-link" href={event.url} target="_blank" rel="noreferrer">
              View official event page <ExternalLink size={14} />
            </a>
          )}

          <div className="registration-footnote">
            This is a frontend registration demo. No payment is collected.
          </div>
        </aside>
      </div>
    </main>
  );
}