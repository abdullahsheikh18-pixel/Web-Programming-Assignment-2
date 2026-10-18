import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: { items: [], status: 'idle', error: '' },
  reducers: {
    eventsRequested: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    eventsReceived: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    eventsFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearEvents: () => ({ items: [], status: 'idle', error: '' }),
  },
});

export const { eventsRequested, eventsReceived, eventsFailed, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;