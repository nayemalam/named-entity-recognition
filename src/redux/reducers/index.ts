import { combineReducers } from 'redux'
import counterSlice from './counter/counterSlice'
import pageThemeSlice from './theme/pageThemeSlice'

const rootReducer = combineReducers({
  counter: counterSlice,
  pageTheme: pageThemeSlice,
})

export default rootReducer
