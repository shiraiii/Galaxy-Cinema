import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import { TextField } from "@mui/material"
import { MenuItem } from "@mui/material"
import dayjs from "dayjs"
import "dayjs/locale/vi"

const MovieShowtime = ({ showtimes = [] }) => {
  dayjs.locale("vi")
  const [userInput, setUserInput] = useState({
    city: "Toàn quốc",
    name: "Tất cả các rạp",
  })
  const [cinemas, setCinemas] = useState([])
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/cinema/getAllCinema")
      .then((res) => res.json())
      .then((data) => setCinemas(data))
      .catch((err) => console.log(err))
  }, [])

  const filteredCinema =
    userInput.city === "Toàn quốc"
      ? cinemas
      : cinemas.filter(
          (cinema) => cinema.city === userInput.city || userInput.city === ""
        )

  const settings = {
    dot: false,
    slidesToShow: 5,
    initialSlide: 0,
    infinite: false,
    centerPadding: 0,
    arrows: false,
    rtl: false,
    swipe: false,
    draggable: false,
  }
  const today = dayjs().startOf("day")
  if (!Array.isArray(showtimes) || showtimes.length <= 0) return null
  return (
    <div className="movie__showtime">
      <div className="movie__showtime-header">
        <span className="border-l-4 border-solid border-[#034ea2] mr-2 "></span>
        <h1 className="mb-4 text-base inline-block capitalize font-bold">
          Lịch chiếu
        </h1>
      </div>
      <div className="movie__filter grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-12 items-center ">
        <div className="filter_date overflow-x-scroll order-2 sm:order-1 sm:col-span-3 md:col-span-3 xl:col-span-7 lg:col-span-3 px-7 mt-6 md:mt-0">
          <Slider {...settings}>
            {showtimes?.map((showtime, index) => {
              const formattedStartDate = dayjs(showtime.startDate).format(
                "DD/MM"
              )
              const startDate = dayjs(showtime.startDate)
              const isToday = startDate.isSame(today, "day")
              const dayOfWeek = isToday
                ? "Hôm nay"
                : dayjs(showtime.startDate).format("dddd")
              return (
                <div key={index} className="mx-2">
                  <a className="flex flex-wrap items-center capitalize text-center text-sm w-[80px] h-[65px] rounded-[5px] py-2 cursor-pointer bg-[#034ea2] text-white">
                    <span className="inline-block w-full">{dayOfWeek}</span>
                    <span className="inline-block w-full">
                      {formattedStartDate}
                    </span>
                  </a>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className="filter__location order-1 sm:order-2 sm:col-span-3 md:col-span-3 xl:col-span-5 lg:col-span-2 grid grid-cols-2 ml-2 gap-1">
          <div className="col-span-1">
            <TextField
              select
              size="small"
              fullWidth
              name="city"
              onChange={onChangeHandle}
              value={userInput.city}
              className="text-sm"
            >
              <MenuItem value="Toàn quốc">Toàn quốc</MenuItem>
              {cinemas.map((cinema, index) => {
                return (
                  <MenuItem key={index} value={cinema.city}>
                    <span>{cinema.city}</span>
                  </MenuItem>
                )
              })}
            </TextField>
          </div>
          <div className="col-span-1">
            <TextField
              select
              size="small"
              name="name"
              fullWidth
              onChange={onChangeHandle}
              value={userInput.name}
              className="text-sm "
            >
              <MenuItem value="Tất cả các rạp">Tất cả các rạp</MenuItem>
              {filteredCinema.map((cinema, index) => {
                return (
                  <MenuItem key={index} value={cinema.name}>
                    <span>{cinema.name}</span>
                  </MenuItem>
                )
              })}
            </TextField>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieShowtime
