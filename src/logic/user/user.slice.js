import { createSlice } from '@reduxjs/toolkit'
import { name } from './user.constants'

export const initialState = {
  id: undefined,
  paired: false,
  ip: undefined,
}

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    signIn(state, action) {
      state.id = action.payload.userId
      state.paired = true
    },
    signOut(state) {
      state.id = undefined
      state.paired = false
    },
    setIP(state, action) {
      state.ip = action.payload
    },
  },
})

export const { signIn, signOut, setIP } = usersSlice.actions

export default usersSlice.reducer
