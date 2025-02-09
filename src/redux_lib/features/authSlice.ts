import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux_lib/store";

interface AuthState {
  idToken: string | null;
}

const initialState: AuthState = {
  idToken: null,
};

export const apiHTTPWrapper = createAsyncThunk(
  "auth/apiHTTPWrapper",
  async (
    { url, options = {}, idToken }: { url: string; options?: RequestInit, idToken?: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = idToken ?? state.auth.idToken;

    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
  }
);

export const apiSocketWrapper = createAsyncThunk(
  "auth/apiSocketWrapper",
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
  name: "auth",
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
