import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

export const filterAndSortMovies = (movies, today, status) => {
  return movies
    .filter((movie) => {
      const releaseDate = dayjs(movie.releaseDate)
        .tz("Asia/Ho_Chi_Minh")
        .startOf("day")
        .format("YYYY-MM-DD")

      if (status === "nowShowing") {
        const endDate = dayjs(movie.endDate)
          .tz("Asia/Ho_Chi_Minh")
          .startOf("day")
          .format("YYYY-MM-DD")

        return releaseDate <= today && endDate >= today
      } else if (status === "upcoming") {
        return releaseDate > today
      }

      return false
    })
    .sort((a, b) => {
      const aReleaseDate = dayjs(a.releaseDate).tz("Asia/Ho_Chi_Minh")
      const bReleaseDate = dayjs(b.releaseDate).tz("Asia/Ho_Chi_Minh")
      return bReleaseDate - aReleaseDate
    })
}
