import React, { useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AppContext from "../../context/AppContext"

const Movies = () => {
  const { movies } = useContext(AppContext)

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/api/v1/movie/deleteMovie/" + id)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const refreshPage = () => {
    window.location.reload(false)
  }
  return (
    <div className="flex h-full bg-red-500 justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <Link
          to="/admin/movie/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add +
        </Link>
        <Link
          to="/admin"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Back
        </Link>
        <table className="table w-full table--users mt-2">
          <thead>
            <tr className="w-auto">
              <th className="text-left">Moive Name</th>
              <th className="text-left">Movie Img</th>
              <th className="text-left">Moive Rating</th>
              <th className="text-left">Age Limit</th>
              <th className="text-left">Movie Banner</th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((movie, index) => {
              return (
                <tr key={index}>
                  <td>{movie.movieName}</td>
                  <td>
                    <img className="w-[100px]" src={movie.movieImg}></img>
                  </td>
                  <td>{movie.movieRating}</td>
                  <td>{movie.ageLimit}</td>
                  <td>
                    <img className="w-[100px]" src={movie.movieBanner}></img>
                  </td>
                  <td>
                    <Link
                      to={`/admin/movie/update/${movie._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(movie._id)
                        refreshPage()
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Movies
