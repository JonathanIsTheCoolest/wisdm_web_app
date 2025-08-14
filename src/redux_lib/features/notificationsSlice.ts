import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IncomingNotification {
  created_at: string;
  updated_at: string;
  table_name: string;
  reference_id: string;
  id: string;
  is_deleted: boolean;
  is_read: boolean;
  action: string;
  path: string;
  username: string;
  reference_type: string;
}

export interface DisplayNotification {
  count: number;
  action: string;
  created_at: string;
  path: string;
  username: string;
  is_read: boolean;
  reference_id: string;
  reference_type: string;
}

export interface NotificationState {
  [key: string]: DisplayNotification;
}

export const initialState: NotificationState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationState: (_state, action: PayloadAction<NotificationState>) => {
      return { ...action.payload };
    },
    updateNotificationState: (state, action: PayloadAction<IncomingNotification>) => {
      const { reference_id, action: action_type } = action.payload;

      const objectKey = `${reference_id}${action_type}`;
      const currentObject = state[objectKey] || {count: 0}
      const currentCount = currentObject.count + 1;


      state[objectKey] = {
        ...currentObject,
        ...action.payload,
        count: currentCount,
      };
    }
  }
});

export const { setNotificationState, updateNotificationState } = notificationSlice.actions;

export default notificationSlice.reducer;