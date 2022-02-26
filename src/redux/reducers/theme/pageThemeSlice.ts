import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface PageThemeSliceState {
  mode: 'light' | 'dark'
}

const initialState: PageThemeSliceState = {
  mode: 'light',
}

const pageThemeSlice = createSlice({
  name: 'pageTheme',
  initialState,
  reducers: {
    setPageTheme: (state, action) => {
      state.mode = action.payload
    },
  },
})

// actions
export const pageThemeActions = pageThemeSlice.actions

// selectors
const selectPageTheme = (state: RootState) => state.pageTheme.mode

export const pageThemeState = {
  selectPageTheme,
}

// reducer
export default pageThemeSlice.reducer
