import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"

const SeatsSection = () => {
  const [showtimes, setShowtimes] = useState([])
  const [movies, setMovies] = useState([])
  const [cinemas, setCinemas] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [selectedCinemaId, setSelectedCinemaId] = useState("")
  const [selectedSeats, setSelectedSeats] = useState([])

  const { id } = useParams()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const initialDate = query.get("date")
  const initialCinemaId = query.get("cinema")
  const initialTime = query.get("showtime")

  useEffect(() => {
    setSelectedDate(initialDate)
    setSelectedCinemaId(initialCinemaId)
    setSelectedShowtime(initialTime)
  }, [initialDate, initialCinemaId, initialTime])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getMovie/" + id)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movie: ", err))
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/showtime/getShowtime/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText)
        }
        return res.json()
      })
      .then((data) => {
        setShowtimes(Array.isArray(data) ? data : [])
      })
      .catch((err) => console.error("Error fetching showtimes: ", err))
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/cinema/getCinema/${selectedCinemaId}`)
      .then((res) => res.json())
      .then((data) => setCinemas(data))
      .catch((err) => console.error("Error fetching cinema: ", err))
  }, [selectedCinemaId])

  const filteredShowtimes = showtimes.filter((showtime) => {
    const showtimeStartDate = dayjs(showtime.startDate, "YYYY-MM-DD")
    const showtimeEndDate = dayjs(showtime.endDate, "YYYY-MM-DD")
    const selectedDateObj = dayjs(selectedDate, "YYYY-MM-DD")
    return (
      selectedDateObj.isBetween(
        showtimeStartDate,
        showtimeEndDate,
        null,
        "[]"
      ) && showtime.cinemaId === selectedCinemaId
    )
  })

  const handleSeatClick = (rowLetter, seatNumber, uniqueSeatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(uniqueSeatId)) {
        return prevSelectedSeats.filter((id) => id !== uniqueSeatId)
      } else {
        console.log(`${rowLetter}${seatNumber}`)

        return [...prevSelectedSeats, uniqueSeatId]
      }
    })
  }

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime._id)
  }

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
            {filteredShowtimes.map((filterdShowtime) => {
              const isSelected = selectedShowtime === filterdShowtime._id
              return (
                <button
                  key={filterdShowtime._id}
                  className={`py-2 px-4 border rounded text-sm font-normal text-[#333333]  transition-all duration-500 ease-in-out hover:bg-[#034EA2] hover:text-white ${
                    isSelected ? "bg-[#034EA2] text-white" : ""
                  }`}
                  onClick={() => handleShowtimeClick(filterdShowtime)}
                >
                  {filterdShowtime.startAt}
                </button>
              )
            })}
          </div>
        </div>
        <div className="bg-white md:px-6 py-4 px-2 rounded md:mb-8 w-full">
          <div className="md:block flex flex-wrap justify-center w-full h-full overflow-auto">
            {cinemas ? (
              <ul className="seat__layout-rows md:mb-8 w-auto grid gird-cols-1 items-center flex-auto text-o">
                {cinemas.seats?.map((rowSeats, rowIndex) => (
                  <li
                    key={rowIndex}
                    className="flex justify-between mb-3 md:gap-0 gap-1 flex-nowrap"
                  >
                    <div className="text-sm text-[#777777] font-semibold flex-none w-5 text-left ">
                      {alphabets[rowIndex] || ""}
                    </div>
                    <div className="flex md:gap-2 gap-1 grow justify-center min-w-[398px] flex-1">
                      {rowSeats.map((seat, seatIndex) => {
                        const uniqueSeatId = `${rowIndex}-${seatIndex}`
                        return (
                          <button
                            key={uniqueSeatId}
                            className={`md:h-5 h-4 border rounded md:text-[12px] text-[10px] transition-all duration-200 ease-in-out text-white md:w-5 w-4 border-[#d0d0d0] xl:hover:bg-[#f26b38] xl:hover:border-[#f26b38] ${
                              selectedSeats.includes(uniqueSeatId)
                                ? "bg-[#f26b38] border-[#f26b38]"
                                : ""
                            }`}
                            onClick={() =>
                              handleSeatClick(
                                alphabets[rowIndex],
                                seatIndex + 1,
                                uniqueSeatId
                              )
                            }
                          >
                            <span
                              className={`inline-block md:w-5 w-4 text-center ${
                                selectedSeats.includes(uniqueSeatId)
                                  ? "text-white"
                                  : "text-[#333333]"
                              } `}
                            >
                              {seatIndex + 1}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="text-sm text-[#777777] font-semibold flex-none w-5 text-right ">
                      {alphabets[rowIndex] || ""}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="seat__layout-screen">
            <p className="text-[12px] text-[#cccccc] text-center">Màn hình</p>
            <div className="border-2 border-[#ff8455] mt-3"></div>
            <div className="text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2">
              <div className="flex gap-5">
                <div>
                  <span className="w-5 h-5 rounded bg-[#d0d0d0] inline-block align-middle"></span>
                  <span className="ml-2">Ghế đã bán</span>
                </div>
                <div>
                  <span className="w-5 h-5 rounded bg-[#f26b38] inline-block align-middle"></span>
                  <span className="ml-2">Ghế đang chọn</span>
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <span className="w-5 h-5 rounded border border-[#f2c94c] inline-block align-middle"></span>
                  <span className="ml-2">Ghế VIP</span>
                </div>
                <div>
                  <span className="w-5 h-5 rounded border border-[#d0d0d0] inline-block align-middle"></span>
                  <span className="ml-2">Ghế đơn</span>
                </div>
                <div>
                  <span className="w-[46px] h-5 rounded border border-[#034ea2] inline-block align-middle"></span>
                  <span className="ml-2">Ghế đôi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatsSection
