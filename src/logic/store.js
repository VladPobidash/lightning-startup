import { configureStore } from '@reduxjs/toolkit'
import counter from './counter/counter.slice'

export const store = configureStore({
  reducer: {
    counter,
  },
})
