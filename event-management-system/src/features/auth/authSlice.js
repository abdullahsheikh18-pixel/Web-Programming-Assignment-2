import { createSlice } from '@reduxjs/toolkit';

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('gather_user'));
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: getSavedUser() },
  reducers: {
    registerUser: (state, action) => { state.user = action.payload; },
    loginUser: (state, action) => { state.user = action.payload; },
    logoutUser: (state) => { state.user = null; },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;