import { createSlice } from '@reduxjs/toolkit'
import { name } from './app.constants'
import { loadApp } from './app.thunks'

export const initialState = {
  isLoading: false,
  isReady: false,
  error: undefined,
}

const appSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder.addCase(loadApp.pending, state => {
      state.isLoading = true
    })
    builder.addCase(loadApp.fulfilled, state => {
      state.isLoading = false
      state.isReady = true
    })
    builder.addCase(loadApp.rejected, (state, action) => {
      state.error = action.error
    })
  },
})

export default appSlice.reducer
