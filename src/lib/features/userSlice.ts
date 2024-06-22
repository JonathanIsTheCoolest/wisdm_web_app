import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  avatar: string;
  currentChannel: string | null;
  email: string;
  lastPostId: string;
  locality: string;
  numPosts: number;
  userName: string;
}

interface UserAction {
  avatar: string;
  current_channel: string | null;
  email: string;
  last_post_id: string;
  locality: string;
  num_posts: number;
  user_name: string;
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
    setUser: (state: UserState, action: PayloadAction<UserAction>) => {
      const { avatar, current_channel, email, last_post_id, locality, num_posts, user_name } = action.payload
      return {
        avatar: avatar,
        currentChannel: current_channel,
        email: email,
        lastPostId: last_post_id,
        locality: locality,
        numPosts: num_posts,
        userName: user_name
      };
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;