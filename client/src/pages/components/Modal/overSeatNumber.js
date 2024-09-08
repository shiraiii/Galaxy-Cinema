import React, { useContext } from "react"
import AppContext from "../../../context/AppContext"

const OverSeatNumber = () => {
  const { setShowLoginModal, setShowModal } = useContext(AppContext)
  return (
    <>
      <div>OverSeatNumber</div>
      <button
        onClick={() => {
          setShowLoginModal(true)
          setShowModal(false)
        }}
      >
        Dong
      </button>
    </>
  )
}

export default OverSeatNumber
