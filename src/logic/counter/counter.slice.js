import { createSlice } from '@reduxjs/toolkit'
import { name } from './counter.constants'

export const initialState = {
  value: 0,
}

const counterSlice = createSlice({
  name,
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
