import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux_lib/features/userSlice'
import authSlice from '@/redux_lib/features/authSlice'
import signupSlice from '@/redux_lib/features/signupSlice'
import notificationSlice from '@/redux_lib/features/notificationsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      auth: authSlice,
      signup: signupSlice,
      notifications: notificationSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']