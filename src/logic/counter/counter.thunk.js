import { createAsyncThunk } from '@reduxjs/toolkit'
import { name } from './counter.constants'
import { incrementByAmount } from './counter.slice'

export const asyncIncrement = createAsyncThunk(
  `${name}/asyncIncrement`,
  async (_, { dispatch }) => {
    const value = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(5)
      }, 1000)
    })

    await dispatch(incrementByAmount(value))
  }
)
