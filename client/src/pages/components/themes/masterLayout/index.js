import { memo, useCallback, useEffect, useReducer, useState } from "react"
import Header from "../header"
import Footer from "../footer"
import { AppReducer } from "../../../../reducer/AppReducer"
import AppContext from "../../AppContext"
import axios from "axios"
import manageToken from "../../../../utils/manageToken"
const MasterLayout = ({ children, ...props }) => {
  const initialState = { user: null }
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const option = {
        method: "GET",
        url: "/api/v1/auth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option)
      if (response.data.data.user) {
        const { userName } = response.data.data.user
        dispatch({ type: "CURRENT_USER", payload: { userName } })
      }
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])
  useEffect(() => {
    checkCurrentUser()
  }, [checkCurrentUser])
  useEffect(() => {
    const cleanup = manageToken()
    return () => cleanup()
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div {...props}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AppContext.Provider>
  )
}

export default memo(MasterLayout)
