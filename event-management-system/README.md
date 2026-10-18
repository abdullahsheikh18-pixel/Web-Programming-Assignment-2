# Gather — Event Management System

A responsive React event discovery and registration web application built for Web Programming Assignment 2. Powered by React, React Router, Redux Toolkit, and the Ticketmaster Discovery API.

---

##  Key Features

* **Authentication System**: Register, log in, and log out with simulated client-side authentication.
* **Local Storage Persistence**: Maintains user accounts (`gather_accounts`), active user session (`gather_user`), and personal event registrations (`gather_registrations`).
* **Event Discovery & Filtering**: Fetch live Ticketmaster events, search by keyword or city, and filter by category (Music, Sports, Arts & Theatre, Film, etc.).
* **Event Details**: Comprehensive event details including date, time, venue, location, full descriptions, and links to official Ticketmaster pages.
* **Event Registration**: Register for events with built-in duplicate prevention, view a personal event lineup, and cancel upcoming registrations.
* **Protected Routes**: Restricts access to user-specific routes (like `/my-events`) for unauthenticated users.
* **Responsive UI & States**: Clean component structure, custom skeleton loading states, error handling, and empty state fallbacks.

---

##  Project Architecture

```text
src/
├── api/
│   └── ticketmaster.js           # API service for fetching & normalizing Ticketmaster data
├── components/
│   ├── EventCard.jsx             # Reusable event card component
│   ├── Footer.jsx                # Site footer component
│   ├── Navbar.jsx                # Responsive header with session state
│   └── ProtectedRoute.jsx        # Navigation guard for private routes
├── features/
│   ├── auth/
│   │   └── authSlice.js          # Redux slice for user session management
│   ├── events/
│   │   └── eventsSlice.js        # Redux slice for event search and details state
│   └── registrations/
│       └── registrationsSlice.js # Redux slice for user registrations
└── pages/
    ├── Auth.jsx                  # Combined login and registration page
    ├── EventDetails.jsx          # Detailed single event page with registration action
    ├── Events.jsx                # Main search & filter discovery page
    ├── Home.jsx                  # Hero page with featured events
    └── MyEvents.jsx              # Personal registration lineup & filter tabs