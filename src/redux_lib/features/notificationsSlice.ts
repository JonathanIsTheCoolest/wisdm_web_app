import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IncomingNotification {
  created_at: string;
  updated_at: string;
  deleted_at: string;
  table_name: string;
  reference_id: string;
  notification_id: string;
  is_deleted: boolean;
  is_read: boolean;
  action: string;
  path: string;
  username: string;
}

export interface DisplayNotification {
  count: number;
  action: string;
  created_at: string;
  path: string;
  username: string;
  is_read: boolean;
}

export interface NotificationState {
  [key: string]: DisplayNotification;
}

export const initialState: NotificationState = {}; // Fixed incorrect type

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationState: (_state, action: PayloadAction<NotificationState>) => {
      return { ...action.payload }; // Avoids direct mutation
    },
    updateNotificationState: (state, action: PayloadAction<IncomingNotification>) => {
      const { created_at, reference_id, action: action_type, username, is_read } = action.payload;

      const objectKey = `${reference_id}${action_type}`;
      const currentObject = state[objectKey] || { count: 0 };
      const currentCount = currentObject.count + 1;


      state[objectKey] = {
        ...currentObject,
        count: currentCount,
        created_at,
        username,
        is_read
      };
    }
  }
});

export const { setNotificationState, updateNotificationState } = notificationSlice.actions;

export default notificationSlice.reducer;
