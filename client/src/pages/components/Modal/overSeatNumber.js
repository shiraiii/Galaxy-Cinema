import React, { useContext } from "react"
import AppContext from "../../../context/AppContext"

const OverSeatNumber = () => {
  const { setShowLoginModal, setShowModal, setOverSeats, SEATLIMIT } =
    useContext(AppContext)
  return (
    <div
      className="react-responsive-modal-modal modal-375 text-center p-10 "
      role="dialog"
      aria-modal="true"
      data-testid="modal"
      tabIndex="-1"
      style={{
        animation:
          "300ms ease 0s 1 normal none running react-responsive-modal-modal-in",
      }}
    >
      <div className="text-center w-full">
        <img
          alt="Icon Notice"
          className="w-10 h-10 inline-block"
          src="https://www.galaxycine.vn/_next/static/media/notice.e305ff4b.png"
        ></img>
        <p className="text-lg font-bold not-italic my-3">Thông báo</p>
      </div>
      <div className="modal__content w-full">
        <p className="text-sm font-normal text-[#333333] not-italic">
          Số lượng ghế tối đa được đặt là {SEATLIMIT} ghế
        </p>
        <div className="modal__footer flex justify-center gap-3 mt-6">
          <button
            onClick={() => {
              setShowLoginModal(true)
              setShowModal(false)
              setOverSeats(false)
            }}
            className="rounded-md hover:bg-[#e38601] transition-all duration-30 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center text-white bg-primary w-[150px] h-10 px-5 py-2.5 text-sm capitalize font-bold rounded"
          >
            <span>Đóng</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OverSeatNumber
