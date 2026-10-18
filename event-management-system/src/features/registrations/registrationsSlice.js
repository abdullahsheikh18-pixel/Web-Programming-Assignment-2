import { createSlice } from '@reduxjs/toolkit';

const getSavedRegistrations = () => {
  try {
    return JSON.parse(localStorage.getItem('gather_registrations')) || [];
  } catch {
    return [];
  }
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: { items: getSavedRegistrations() },
  reducers: {
    registerForEvent: (state, action) => {
      const { eventId, userEmail } = action.payload;
      const alreadyRegistered = state.items.some(
        (item) => item.eventId === eventId && item.userEmail === userEmail
      );
      
      if (!alreadyRegistered) {
        state.items.push({ ...action.payload, registeredAt: new Date().toISOString() });
      }
    },
    cancelRegistration: (state, action) => {
      const { eventId, userEmail } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.eventId === eventId && item.userEmail === userEmail)
      );
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;