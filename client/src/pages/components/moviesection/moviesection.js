import React, { useEffect, useState } from "react"
import "./moviesection.css"
import { Tabs, Tab, TabsList, TabPanel } from "../Tabs/Tabs"
import Moviecard from "../movie-card/moviecard"
import MovieCardIMAX from "../movie-card/moviecard-imax"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const Moviesection = () => {
  const [lists, setLists] = useState([])
  const [movies, setMovies] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetch("/api/movieCats")
      .then((res) => res.json())
      .then((data) => setLists(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/movie/getAllMovie")
      .then((res) => res.json())
      .then((data) => setMovies(data))
  }, [])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  const today = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("day")
    .format("YYYY-MM-DD")

  const nowShowingMovies = movies.filter((movie) => {
    const releaseDate = dayjs(movie.releaseDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD")

    const endDate = dayjs(movie.endDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD")

    return releaseDate <= today && endDate >= today
  })

  const upcomingMovies = movies.filter((movie) => {
    const releaseDate = dayjs(movie.releaseDate)
      .tz("Asia/Ho_Chi_Minh")
      .startOf("day")
      .format("YYYY-MM-DD")

    return releaseDate > today
  })

  return (
    <div className="pb-12 pt-6 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] ">
      <Tabs>
        <div className="flex w-full md:justify-start justify-between gap-5 items-center mb-10">
          <div className="flex">
            <div className="hidden md:block">
              <span className="border-l-4 border-solid border-[#034EA2] mr-2 "></span>
              <h1 className="mr-10 text-xl font-bold not-italic uppercase inline">
                Phim
              </h1>
            </div>
            <div className="flex flex-wrap">
              <TabsList>
                {lists?.map((list, index) => {
                  return (
                    <li
                      key={index}
                      className="-mb-px mr-3 md:mr-8 text-[#333333] last:mr-0 flex-auto text-center hover:text-[#034EA2] transition-all duration-300 ease-in-out cursor-pointer relative "
                      onClick={() => handleClick(index)}
                    >
                      <Tab index={index}>{list?.name}</Tab>
                    </li>
                  )
                })}
              </TabsList>
            </div>
          </div>
          <a className="text-[#034EA2] cursor-pointer md:text-base screen360:text-[12px] text-sm">
            <i className="fa-solid fa-location-crosshairs"></i>
            <span className="inline-block ml-1">Toàn quốc</span>
          </a>
        </div>
        <div className="tabs__content">
          <div>
            <div className={activeIndex === 0 ? "" : "hidden"}>
              <TabPanel onClick={handleClick} index={0}>
                {" "}
                <Moviecard movies={nowShowingMovies} n={8}></Moviecard>
              </TabPanel>
              <div className="film__footer text-center transition-all duration-300 cursor-pointer">
                <a
                  type="button"
                  className="text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] mr-2 mb-2 justify-center"
                  href="phim-dang-chieu"
                >
                  Xem thêm
                  <i className="fa-solid fa-angle-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className={activeIndex === 1 ? "" : "hidden"}>
              <TabPanel onClick={handleClick} index={1}>
                <Moviecard movies={upcomingMovies} n={8}></Moviecard>
              </TabPanel>
              <div className="film__footer text-center transition-all duration-300 cursor-pointer">
                <a
                  type="button"
                  className="text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] mr-2 mb-2 justify-center"
                  href="phim-sap-chieu"
                >
                  Xem thêm
                  <i className="fa-solid fa-angle-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className={activeIndex === 2 ? "" : "hidden"}>
              <TabPanel index={2}>
                <MovieCardIMAX movies={nowShowingMovies} n={8}></MovieCardIMAX>
              </TabPanel>
              <div className="film__footer text-center transition-all duration-300 cursor-pointer">
                <a
                  type="button"
                  className="text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] mr-2 mb-2 justify-center"
                  href="phim-IMAX"
                >
                  Xem thêm
                  <i className="fa-solid fa-angle-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default Moviesection
