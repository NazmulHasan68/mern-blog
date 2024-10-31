import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})