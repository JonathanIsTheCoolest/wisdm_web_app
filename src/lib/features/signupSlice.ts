import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  name: string | null;
  username: string | null;
  locality: string | null;
  interests: Array<string>;
  traits: Array<string>;
}

const initialState: SignupState = {
  name: null,
  username: null,
  locality: null,
  interests: [],
  traits: [],
};

const signupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignupState: (state, action: PayloadAction<Partial<SignupState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSignupState } = signupSlice.actions;

export default signupSlice.reducer;