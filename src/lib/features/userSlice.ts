import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  avatar: string;
  currentChannel: string;
  email: string;
  lastPostId: string;
  locality: string;
  numPosts: number;
  userName: string;
}

const initialState: UserState = {
  avatar: '',
  currentChannel: '',
  email: '',
  lastPostId: '',
  locality: '',
  numPosts: 0,
  userName: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;