import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./api/apiSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})
