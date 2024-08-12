import React from "react"
import { Link } from "react-router-dom"
const Admin = () => {
  return (
    <div>
      <h1 className="text-center">Đây là trang Admin</h1>
      <div className="flex space-x-4 mt-5 justify-center">
        <Link
          to={"/admin/user/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          User
        </Link>
        <Link
          to={"/admin/movie/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Movie
        </Link>
        <Link
          to={"/admin/cinema/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cinema
        </Link>
        <Link
          to={"/admin/showtime/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Time
        </Link>
      </div>
    </div>
  )
}

export default Admin
