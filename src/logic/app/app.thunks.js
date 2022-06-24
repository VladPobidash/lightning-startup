import { createAsyncThunk } from '@reduxjs/toolkit'
import { myIP } from '../../client/ip'
import { layoutData } from '../../client/layout'
import { loadLayout } from '../layout/layout.slice'
import { setIP, signIn } from '../user/user.slice'
import { name } from './app.constants'

export const loadApp = createAsyncThunk(`${name}/load`, async (_, { dispatch }) => {
  // TODO: replace it by some real app loading actions, config fetching, etc.
  const { data } = await myIP()
  await dispatch(setIP(data.ip))

  const layout = await layoutData()

  // TODO: should be some authN API call
  await dispatch(signIn({ userId: 123 }))
  await dispatch(loadLayout({ layout: layout.data.results }))
})
