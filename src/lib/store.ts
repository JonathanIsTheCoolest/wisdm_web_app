import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/lib/features/userSlice'
import authSlice from '@/lib/features/authSlice'
import signupSlice from '@/lib/features/signupSlice'

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