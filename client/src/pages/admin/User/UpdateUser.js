import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateUser = () => {
  const { id } = useParams()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fectchData = async () => {
      try {
        const option = {
          method: "GET",
          url: "http://localhost:5000/api/v1/user/getUser/" + id,
        }
        const response = await axios(option)
        console.log(response)
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
      } catch (err) {
        console.log(err)
      }
    }
    fectchData()
  }, [])

  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault()
    axios
      .put("http://localhost:5000/api/v1/user/updateUser/" + id, {
        name,
        email,
        phone,
      })
      .then((res) => {
        console.log(res)
        navigate("/admin/user")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="flex h-100 justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Họ và tên
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              autoComplete="true"
              type="text"
              id="fullname"
              placeholder="Nhập họ và tên"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Email
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={email}
              required
              autoComplete="true"
              type="text"
              id="email"
              placeholder="Nhập email"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </span>
          <label
            htmlFor=""
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Số điện thoại
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              value={phone}
              required
              autoComplete="true"
              type="text"
              id="phone"
              placeholder="Nhập số điện thoại"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </span>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-1 rounded"
          >
            Update
          </button>
          <button
            navigate="/admin/movie"
            className="w-full bg-gray-500 mt-2 text-white font-bold py-1 rounded"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
