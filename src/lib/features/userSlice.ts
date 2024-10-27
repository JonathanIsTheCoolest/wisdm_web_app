import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  avatar: string | null;
  currentChannel: string | null;
  email: string | null;
  lastPostId: string | null;
  locality: string | null;
  numPosts: number | null;
  username: string | null;
}

interface UpdateChannelPayload {
  current_channel: string | null;
}

interface UserAction {
  avatar: string | null;
  current_channel: string | null;
  email: string | null;
  last_post_id: string | null;
  locality: string | null;
  num_posts: number | null;
  username: string | null;
}

const initialState: UserState = {
  avatar: '',
  currentChannel: null,
  email: '',
  lastPostId: '',
  locality: '',
  numPosts: 0,
  username: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserAction>) => {
      const { avatar, current_channel, email, last_post_id, locality, num_posts, username } = action.payload
      return {
        avatar: avatar ?? state.avatar,
        currentChannel: current_channel ?? state.currentChannel,
        email: email ?? state.email,
        lastPostId: last_post_id ?? state.lastPostId,
        locality: locality ?? state.locality,
        numPosts: num_posts ?? state.numPosts,
        username: username ?? state.username
      };
    },
    updateCurrentChannel: (state, action: PayloadAction<UpdateChannelPayload>) => {
      state.currentChannel = action.payload.current_channel;
    }
  }
});

export const { setUser, updateCurrentChannel } = userSlice.actions;

export default userSlice.reducer;