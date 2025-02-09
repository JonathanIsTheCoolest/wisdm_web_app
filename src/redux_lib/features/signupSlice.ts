import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalInfo {
  name: string | null;
  username: string | null;
  gender: string | null;
  [key: string]: string | null;
}

export interface SignupState {
  personalInfo: PersonalInfo;
  locality: string | null;
  interests: Array<string>;
  traits: Array<string>;
}

export const initialState: SignupState = {
  personalInfo: {
    name: null,
    username: null,
    gender: null,
  },
  locality: null,
  interests: [],
  traits: [],
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setSignupState: (state, action: PayloadAction<Partial<SignupState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSignupState } = signupSlice.actions;

export default signupSlice.reducer;