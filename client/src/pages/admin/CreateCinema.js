import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, TextField } from "@mui/material"

const CreateCinema = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    name: "",
    ticketPrice: "",
    city: "",
    address: "",
    seats: [],
    seatsAvailable: "",
    image: "",
  })
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const handleAddSeat = () => {
    setUserInput({ ...userInput, seats: [...userInput.seats, ""] })
  }


  const handleSeatChange = (index, value) => {
    if (value > 10) return
    const newSeats = [...userInput.seats]
    newSeats[index] = Array.from({ length: value }, () => 0)
    setUserInput({ ...userInput, seats: newSeats })
  }

  const onChangeSubmit = async (e) => {
    try {
      e.preventDefault()
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/cinema/createCinema",
        data: userInput,
      }
      const response = await axios(option)
      console.log(response.data)
      navigate("/admin/cinema")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex h-auto justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <Box
          component={"form"}
          onSubmit={onChangeSubmit}
          sx={{
            "& > :not(style)": { m: 1, width: "82ch" },
          }}
          noValidate
          className="mb-3"
        >
          <h2 className="text-xl font-bold mb-4">Add Cinema</h2>
          <TextField
            id="outlined-basic"
            label="Cinema Name*"
            name="name"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.name}
          />
          <TextField
            id="outlined-basic"
            label="City*"
            name="city"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.city}
            className="ml-13"
          />
          <TextField
            id="outlined-basic"
            name="ticketPrice"
            label="Ticket Price"
            variant="outlined"
            onChange={onChangeHandle}
            type="number"
            value={userInput.ticketPrice}
          />
          <TextField
            id="outlined-basic"
            label="Seats Available*"
            variant="outlined"
            name="seatsAvailable"
            onChange={onChangeHandle}
            type="text"
            value={userInput.seatsAvailable}
            className="ml-13"
          />
          <TextField
            id="outlined-basic"
            label="Address"
            name="address"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.address}
            className="ml-13"
          />
          <TextField
            id="outlined-basic"
            label="Image"
            name="image"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.image}
            className="ml-13"
          />
          {userInput.seats.length > 0 &&
            userInput.seats.map((seat, index) => (
              <div key={`new-seat-${index} - ${seat.length}`} className="w-90">
                <TextField
                  key={`new-seat-${index}`} // Add a unique key for each TextField
                  id="outlined-basic"
                  label={
                    "Add number of seats for row : " +
                    (index + 10).toString(36).toUpperCase()
                  } // Label for each seat
                  name={`seats[${index}]`} // Set name to identify seat number
                  variant="outlined"
                  onChange={(event) =>
                    handleSeatChange(index, event.target.value)
                  }
                  type="number"
                  value={seat.length}
                  inputProps={{ min: 0, max: 10 }}
                  className="w-full"
                />
              </div>
            ))}

          <button
            type="button"
            className="mt-3 w-24 ..."
            onClick={handleAddSeat}
          >
            Add Seat
          </button>

          <button
            type="submit"
            className="mt-3 w-24 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </Box>
      </div>
    </div>
  )
}

export default CreateCinema
