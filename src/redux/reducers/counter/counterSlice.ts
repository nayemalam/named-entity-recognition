import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/store'
import { LoadingStatus } from 'src/types'

type CounterState = {
  value: number
  status: LoadingStatus
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// actions
export const counterActions = counterSlice.actions

// selectors
const selectCount = (state: RootState) => state.counter.value
const selectStatus = (state: RootState) => state.counter.status

export const counterState = { selectCount, selectStatus }

// reducer
export default counterSlice.reducer
