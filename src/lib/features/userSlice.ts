import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  photo_url: string | null;
  current_channel: string | null;
  email: string | null;
  locality: string | null;
  username: string | null;
  name: string | null;
  gender: string | null;
  created_at: string | null;
  last_sign_in_time: string | null;
  disabled: boolean | null;
  partial_data: boolean | null;
}

interface UpdateChannelPayload {
  current_channel: string | null;
}

const initialState: UserState = {
  photo_url: null,
  current_channel: null,
  email: null,
  locality: null,
  username: null,
  name: null,
  gender: null,
  created_at: null,
  last_sign_in_time: null,
  disabled: null,
  partial_data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    updateCurrentChannel: (
      state: UserState,
      action: PayloadAction<UpdateChannelPayload>
    ) => {
      state.current_channel = action.payload.current_channel;
    },
  },
});

export const { setUser, updateCurrentChannel } = userSlice.actions;

export default userSlice.reducer;
