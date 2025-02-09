import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux_lib/features/userSlice'
import authSlice from '@/redux_lib/features/authSlice'
import signupSlice from '@/redux_lib/features/signupSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      auth: authSlice,
      signup: signupSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']