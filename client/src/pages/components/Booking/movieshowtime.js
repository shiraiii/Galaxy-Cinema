import React, { useContext, useState } from "react"
import { ShowtimeContainer, ShowtimeList, ShowtimeTab } from "../Tabs/Tabs"
import Slider from "react-slick"
import { TextField } from "@mui/material"
import { MenuItem } from "@mui/material"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import Showtime_Cinema from "./showtime_cinema"
import AppContext from "../../../context/AppContext"

const MovieShowtime = ({ showtimes = [] }) => {
  dayjs.locale("vi")
  const [userInput, setUserInput] = useState({
    city: "Toàn quốc",
    name: "Tất cả các rạp",
  })
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [activeTab, setActiveTab] = useState(0)
  const { cinemas } = useContext(AppContext)
  const handleTabClick = (index, date) => {
    setActiveTab(index)
    setSelectedDate(dayjs(date))
  }
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const filteredCinema =
    userInput.city === "Toàn quốc"
      ? cinemas
      : cinemas.filter(
          (cinema) => cinema.city === userInput.city || userInput.city === ""
        )

  const filteredCinemas =
    userInput.name === "Tất cả các rạp"
      ? filteredCinema
      : filteredCinema.filter(
          (cinema) => cinema.name === userInput.name || userInput.name === ""
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

  const groupedShowtimes = showtimes
    .filter((showtime) => {
      const startDate = dayjs.utc(showtime.startDate).tz("Asia/Ho_Chi_Minh")
      return (
        startDate.isAfter(dayjs().tz("Asia/Ho_Chi_Minh")) ||
        startDate.isSame(dayjs().tz("Asia/Ho_Chi_Minh"), "day")
      )
    })
    .sort((a, b) =>
      dayjs.utc(a.startDate).isAfter(dayjs.utc(b.startDate)) ? 1 : -1
    )
    .reduce((acc, showtime) => {
      const date = dayjs(showtime.startDate).format("YYYY-MM-DD")
      if (!acc[date]) {
        acc[date] = {
          date,
          showtimes: [showtime],
        }
      } else {
        acc[date].showtimes.push(showtime)
      }
      return acc
    }, {})

  const uniqueShowtimes = Object.values(groupedShowtimes)

  const defaultIndex = uniqueShowtimes.findIndex((showtimeGroup) =>
    dayjs(showtimeGroup.date).isSame(today, "day")
  )

  const filteredShowtimes = uniqueShowtimes.filter((showtimeGroup) =>
    dayjs(showtimeGroup.date).isSame(selectedDate, "day")
  )
  if (!Array.isArray(showtimes) || showtimes.length <= 0) return null

  return (
    <div className="movie__showtime">
      <ShowtimeContainer defaultIndex={defaultIndex >= 0 ? defaultIndex : 0}>
        <div className="movie__showtime-header">
          <span className="border-l-4 border-solid border-[#034ea2] mr-2 "></span>
          <h1 className="mb-4 text-base inline-block capitalize font-bold">
            Lịch chiếu
          </h1>
        </div>
        <div className="movie__filter grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-12 items-center ">
          <div className="filter_date overflow-x-scroll order-2 sm:order-1 sm:col-span-3 md:col-span-3 xl:col-span-7 lg:col-span-3 px-7 mt-6 md:mt-0">
            <Slider {...settings}>
              {uniqueShowtimes?.map((showtimeGroup, index) => {
                const formattedStartDate = dayjs(showtimeGroup.date).format(
                  "DD/MM"
                )
                const startDate = dayjs(showtimeGroup.date)
                const isToday = startDate.isSame(today, "day")
                const dayOfWeek = isToday
                  ? "Hôm nay"
                  : dayjs(showtimeGroup.date).format("dddd")
                return (
                  <div
                    key={index}
                    onClick={() => handleTabClick(index, showtimeGroup.date)}
                    className="mx-2"
                  >
                    <ShowtimeTab index={index}>
                      <span className="inline-block w-full">{dayOfWeek}</span>
                      <span className="inline-block w-full">
                        {formattedStartDate}
                      </span>
                    </ShowtimeTab>
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
        <div className="line"></div>
        <ShowtimeList index={activeTab}>
          <Showtime_Cinema
            cinemas={filteredCinemas}
            showtimes={filteredShowtimes.flatMap(
              (showtimeGroup) => showtimeGroup.showtimes
            )}
          ></Showtime_Cinema>
        </ShowtimeList>
      </ShowtimeContainer>
    </div>
  )
}

export default MovieShowtime
