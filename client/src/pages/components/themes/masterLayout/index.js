import { memo, useReducer } from "react"
import Header from "../header"
import Footer from "../footer"
import { AppReducer } from "../../../../reducer/AppReducer"
import AppContext from "../../AppContext"
const MasterLayout = ({ children, ...props }) => {
  const initialState = { user: null }
  const [state, dispatch] = useReducer(AppReducer, initialState)
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
