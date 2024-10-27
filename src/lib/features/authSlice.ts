import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "@/src/lib/store";

interface AuthState {
  idToken: string | null;
}

const initialState: AuthState = {
  idToken: null,
};

export const apiHTTPWrapper = createAsyncThunk(
  'auth/apiHTTPWrapper',
  async ({ url, options }: { url: string; options?: RequestInit }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.idToken;

    const headers = {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response.json();
  }
);

export const apiSocketWrapper = createAsyncThunk(
  'auth/apiSocketWrapper',
  async ({ cb, args }: { cb: Function; args?: object }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.idToken;

    const socketArgs = {
      ...args,
      token,
    };

    return cb(socketArgs);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      const { idToken } = action.payload;
      state.idToken = idToken;
    },
    logout: (state) => {
      state.idToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;