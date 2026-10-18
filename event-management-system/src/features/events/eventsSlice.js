import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: { list: [] },
  reducers: {},
});

export default eventsSlice.reducer;