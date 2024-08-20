import React, { useContext } from "react"
import AppContext from "../../../context/AppContext"
import dayjs from "dayjs"

const SeatsSection = () => {
  const { showtimes, cinemas } = useContext(AppContext)
  return (
    <div className="md:container md:mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:px-0 sm:px-[45px] grid xl:grid-cols-3 grid-cols-1 ">
      <div className="col-span-2 xl:order-first order-last xl:h-full h-[full] overflow-hidden xl:overflow-auto xl:pb-10 pb-32 ">
        <div className="bg-white px-6 py-4 rounded md:mb-8 w-[100%]">
          <div className="md:col-span-2">
            <label className="md:text-base text-sm font-semibold inline-block mt-2">
              Đổi suất chiếu
            </label>
          </div>
          <div className="col-span-8 flex-row gap-4 flex-wrap items-center md:flex hidden">
            <button className="py-2 px-4 border rounded text-sm font-normal text-[#333333]  transition-all duration-500 ease-in-out hover:bg-[#034EA2] hover:text-white">
              {showtimes.startAt}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatsSection
