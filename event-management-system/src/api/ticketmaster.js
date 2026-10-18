const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

function normalizeEvent(event) {
  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.[0];

  return {
    id: event.id,
    name: event.name || 'Untitled event',
    url: event.url || '',
    image: event.images?.find((img) => img.width >= 640 && img.ratio === '16_9')?.url || event.images?.[0]?.url || '',
    date: event.dates?.start?.localDate || '',
    time: event.dates?.start?.localTime || '',
    status: event.dates?.status?.code || '',
    venue: venue?.name || 'Venue to be announced',
    city: venue?.city?.name || '',
    state: venue?.state?.stateCode || venue?.state?.name || '',
    country: venue?.country?.countryCode || '',
    category: classification?.segment?.name || classification?.genre?.name || 'Live event',
    genre: classification?.genre?.name || '',
    info: event.info || event.pleaseNote || '',
    priceRanges: event.priceRanges || [],
  };
}

async function fetchTicketmaster(endpoint, extraParams = {}) {
  if (!API_KEY || API_KEY === 'your_ticketmaster_consumer_key_here') {
    throw new Error('Please add your Ticketmaster API key to the .env file.');
  }

  const params = new URLSearchParams({ apikey: API_KEY, ...extraParams });
  const response = await fetch(`${BASE_URL}${endpoint}?${params}`);

  if (!response.ok) {
    throw new Error(`Ticketmaster error (${response.status})`);
  }

  return response.json();
}

export async function fetchEvents({ keyword = '', category = '', city = '' } = {}) {
  const params = { size: '48', sort: 'date,asc', countryCode: 'US' };
  
  if (keyword.trim()) params.keyword = keyword.trim();
  if (category) params.classificationName = category;
  if (city.trim()) params.city = city.trim();

  const data = await fetchTicketmaster('/events.json', params);
  return (data._embedded?.events || []).map(normalizeEvent);
}

export async function fetchEventById(id) {
  const data = await fetchTicketmaster(`/events/${encodeURIComponent(id)}.json`);
  return normalizeEvent(data);
}