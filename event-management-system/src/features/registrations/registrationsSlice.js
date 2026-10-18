import { createSlice } from '@reduxjs/toolkit';

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: { items: [] },
  reducers: {},
});

export default registrationsSlice.reducer;