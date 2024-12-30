import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import AppContext from "../../../context/AppContext";

const CreateCinema = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    ticketPrice: "",
    city: "",
    address: "",
    seats: [],
    seatsAvailable: "",
    image: "",
  });

  const { token } = useContext(AppContext);
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleAddSeat = () => {
    setUserInput({ ...userInput, seats: [...userInput.seats, ""] });
  };

  const handleSeatChange = (index, value) => {
    if (value > 20) return;
    const newSeats = [...userInput.seats];
    newSeats[index] = Array.from({ length: value }, () => 0);
    setUserInput({ ...userInput, seats: newSeats });
  };

  const onChangeSubmit = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/cinema/createCinema",
        data: userInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      console.log(response.data);
      navigate("/admin/cinema");
    } catch (err) {
      console.log(err);
    }
  };
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
          <h2 className="text-xl font-bold mb-4">Thêm rạp</h2>
          <TextField
            id="outlined-basic"
            label="Tên rạp*"
            name="name"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.name}
          />
          <TextField
            id="outlined-basic"
            label="Thành phố*"
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
            label="Giá vé"
            variant="outlined"
            onChange={onChangeHandle}
            type="number"
            value={userInput.ticketPrice}
          />
          <TextField
            id="outlined-basic"
            label="Số ghế còn lại*"
            variant="outlined"
            name="seatsAvailable"
            onChange={onChangeHandle}
            type="text"
            value={userInput.seatsAvailable}
            className="ml-13"
          />
          <TextField
            id="outlined-basic"
            label="Địa chỉ"
            name="address"
            variant="outlined"
            onChange={onChangeHandle}
            type="text"
            value={userInput.address}
            className="ml-13"
          />
          <TextField
            id="outlined-basic"
            label="Ảnh rạp"
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
                    "Thêm số lượng ghế cho hàng : " +
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
            Thêm ghế
          </button>

          <button
            type="submit"
            className="mt-3 w-24 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Tạo
          </button>
        </Box>
      </div>
    </div>
  );
};

export default CreateCinema;
