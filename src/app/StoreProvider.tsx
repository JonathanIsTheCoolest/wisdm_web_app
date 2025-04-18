'use client'
// System Imports
import { useRef } from 'react'

// API/Database Imports
import { makeStore, AppStore } from '../redux_lib/store'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}