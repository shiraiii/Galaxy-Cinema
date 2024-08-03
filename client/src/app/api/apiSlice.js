import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios from "axios"

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log(action.payload)
    },
  },
})

export const { setUserDetails } = userSlice.actions
export default userSlice.reducer
