import dayjs from "dayjs"
import React, { useContext, useState } from "react"
import AppContext from "../../../context/AppContext"
import { useNavigate } from "react-router-dom"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/vi"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")
const Showtime_Cinema = ({ showtimes, cinemas, showtimeDay }) => {
  const navigate = useNavigate()
  const { isAuth, setShowModal, setRedirectPath } = useContext(AppContext)
  const dataString = sessionStorage.getItem("userInfo")
  const data = JSON.parse(dataString)

  const [selectedTime, setSelectedTime] = useState(null)

  const bookingMovie = (movieId, showtimeDate, cinemaId, showtime) => {
    const url = `/dat-ve/${movieId}?date=${encodeURIComponent(
      showtimeDate
    )}&cinema=${encodeURIComponent(
      cinemaId
    )}&showtime=${showtime.parseTime.format("HH:mm")}`
    if (data?.token) {
      navigate(url)
    } else {
      if (setRedirectPath) {
        setRedirectPath(url)
        setShowModal(true)
      } else {
        console.error("setRedirectPath not found")
      }
    }
  }

  return cinemas.map((cinema, index) => {
    const cinemaShowtimes = showtimes
      .filter((showtime) => showtime.cinemaId === cinema._id)
      .map((showtime) => {
        const date = dayjs().format("YYYY-MM-DD")
        const fullDateTime = `${date}T${showtime.startAt}:00`
        return {
          ...showtime,
          fullDateTime,
          parseTime: dayjs(fullDateTime).tz("Asia/Ho_Chi_Minh"),
        }
      })
      .sort((a, b) => (a.parseTime.isBefore(b.parseTime) ? -1 : 1))
    if (cinemaShowtimes.length === 0) return null
    return (
      <div
        key={index}
        className="showtime_cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-1 even:border-b "
      >
        <h1 className="text-base font-bold mb-4">{cinema.name}</h1>
        <div className="showtime__bundle flex md:flex-row flex-col gap-2 items-start mb-6">
          <label className="text-sm font-semibold text-[#555555] mt-2 w-[150px]">
            2D Phụ đề
          </label>
          <div className="time__show flex flex-1 flex-row gap-x-3 gap-y flex-wrap">
            {cinemaShowtimes.map((showtime) => {
              return (
                <button
                  onClick={() => {
                    setSelectedTime(showtime.startAt)
                    bookingMovie(
                      showtime.movieId,
                      dayjs(showtimeDay).format("YYYY-MM-DD"),
                      cinema._id,
                      showtime
                    )
                  }}
                  key={showtime._id}
                  className="py-2 md:px-8 px-6 border rouned text-sm font-normal text-[#333333] hover:bg-[#034EA2] hover:text-white active:bg-[#034EA2] transition-all duration-500 ease-in-out"
                >
                  {showtime.parseTime.format("HH:mm")}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  })
}

export default Showtime_Cinema
