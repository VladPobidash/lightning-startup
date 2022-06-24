import { createSlice } from '@reduxjs/toolkit'
import { name } from './layout.constants'

export const initialState = {
  layout: [],
}

const layoutSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadLayout(state, action) {
      state.layout = action.payload.layout
    },
  },
})

export const { loadLayout } = layoutSlice.actions

export default layoutSlice.reducer
