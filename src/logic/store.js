import { configureStore } from '@reduxjs/toolkit'
import app from './app/app.slice'
import user from './user/user.slice'
import layout from './layout/layout.slice'
import counter from './counter/counter.slice'

export const store = configureStore({
  reducer: {
    app,
    user,
    layout,
    counter,
  },
})
