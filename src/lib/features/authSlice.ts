import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  idToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    idToken: null
  },
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      const { idToken } = action.payload
      state.idToken = idToken
    },
    logout: (state: AuthState) => {
      state.idToken = null
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
