import React, { useContext, useState } from "react";
import { ShowtimeContainer, ShowtimeList, ShowtimeTab } from "../Tabs/Tabs";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import Showtime_Cinema from "./showtime_cinema";
import AppContext from "../../../context/AppContext";

const MovieShowtime = ({ showtimes = [] }) => {
  dayjs.locale("vi");
  const [userInput, setUserInput] = useState({
    city: "Toàn quốc",
    name: "Tất cả các rạp",
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState(0);
  const { cinemas } = useContext(AppContext);
  const handleTabClick = (index, date) => {
    setActiveTab(index);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const filteredCinema =
    userInput.city === "Toàn quốc"
      ? cinemas
      : cinemas.filter(
          (cinema) => cinema.city === userInput.city || userInput.city === ""
        );

  const filteredCinemas =
    userInput.name === "Tất cả các rạp"
      ? filteredCinema
      : filteredCinema.filter(
          (cinema) => cinema.name === userInput.name || userInput.name === ""
        );

  function PrevArrow(props) {
    const { style, onClick } = props;
    return (
      <button
        className="css-sjy0nk"
        onClick={onClick}
        style={{ ...style, display: "block" }}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
    );
  }

  function NextArrow(props) {
    const { style, onClick } = props;
    return (
      <button
        className="css-10rwe4n"
        onClick={onClick}
        style={{ ...style, display: "block" }}
      >
        <i className="fa-solid fa-angle-right text-[#333333]"></i>
      </button>
    );
  }

  const settings = {
    dot: false,
    slidesToShow: 5,
    initialSlide: 1,
    infinite: false,
    centerPadding: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const today = dayjs().startOf("day");

  const getDatesInRange = (start, end) => {
    const startDate = dayjs(start).startOf("day");
    const endDate = dayjs(end).startOf("day");
    const dateRange = [];
    let currentDate = startDate.isBefore(today) ? today : startDate;

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      dateRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return dateRange;
  };

  const groupedShowtimes = showtimes
    .filter((showtime) => {
      const showtimeDate = dayjs(showtime.date).tz("Asia/Ho_Chi_Minh");
      return showtimeDate.isAfter(today) || showtimeDate.isSame(today, "day");
    })
    .reduce((acc, showtime) => {
      const startDate = dayjs(showtime.startDate);
      const endDate = dayjs(showtime.endDate);
      const datesInRange = getDatesInRange(startDate, endDate);

      datesInRange.forEach((date) => {
        if (!acc[date]) {
          acc[date] = {
            date: date,
            showtimes: [],
          };
        }
        acc[date].showtimes.push(showtime);
      });

      return acc;
    }, {});

  const uniqueShowtimes = Object.values(groupedShowtimes);

  const defaultIndex = uniqueShowtimes.findIndex((showtimeGroup) =>
    dayjs(showtimeGroup.date).isSame(today, "day")
  );

  const filteredShowtimes = uniqueShowtimes.filter((showtimeGroup) =>
    dayjs(showtimeGroup.date).isSame(selectedDate, "day")
  );

  const uniqueCities = [...new Set(cinemas.map((cinema) => cinema.city))];
  if (!Array.isArray(showtimes) || showtimes.length <= 0) return null;

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
          <div className="filter_date order-2 sm:order-1 sm:col-span-3 md:col-span-3 xl:col-span-7 lg:col-span-3 px-7 mt-6 md:mt-0">
            <Slider {...settings}>
              <button></button>
              {uniqueShowtimes?.map((showtimeGroup, index) => {
                const formattedStartDate = dayjs(showtimeGroup.date).format(
                  "DD/MM"
                );
                const startDate = dayjs(showtimeGroup.date);
                const isToday = startDate.isSame(today, "day");
                const dayOfWeek = isToday
                  ? "Hôm nay"
                  : dayjs(showtimeGroup.date).format("dddd");

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
                );
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
                className="text-sm capitalize"
              >
                <MenuItem value="Toàn quốc">Toàn quốc</MenuItem>
                {uniqueCities.map((city, index) => {
                  return (
                    <MenuItem className="capitalize" key={index} value={city}>
                      <span>{city}</span>
                    </MenuItem>
                  );
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
                className="text-sm capitalize "
              >
                <MenuItem value="Tất cả các rạp">Tất cả các rạp</MenuItem>
                {filteredCinema.map((cinema, index) => {
                  return (
                    <MenuItem key={index} value={cinema.name}>
                      <span>{cinema.name}</span>
                    </MenuItem>
                  );
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
            showtimeDay={selectedDate}
          ></Showtime_Cinema>
        </ShowtimeList>
      </ShowtimeContainer>
    </div>
  );
};

export default MovieShowtime;
