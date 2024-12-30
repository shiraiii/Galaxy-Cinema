import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../../../context/AppContext";

const CinemaAdmin = () => {
  const { cinemas, token } = useContext(AppContext);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/api/v1/cinema/deleteCinema/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="flex h-full bg-red-500 justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <Link
          to="/admin/cinema/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm +
        </Link>
        <Link
          to="/admin"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Trở lại
        </Link>
        <table className="table w-full table--users mt-2">
          <thead>
            <tr className="w-auto">
              <th className="text-left">Tên rạp</th>
              <th className="text-left">Ảnh rạp</th>
              <th className="text-left">Giá vé</th>
              <th className="text-left">Thành phố</th>
              <th className="text-left">Địa chỉ</th>
              <th className="text-left">Số ghế còn lại</th>
            </tr>
          </thead>
          <tbody>
            {cinemas?.map((cinema, index) => {
              return (
                <tr key={index}>
                  <td>{cinema.name}</td>
                  <td>
                    <img className="w-[100px]" src={cinema.image}></img>
                  </td>
                  <td>{cinema.ticketPrice}</td>
                  <td>{cinema.city}</td>
                  <td>{cinema.address}</td>
                  <td>{cinema.seatsAvailable}</td>
                  <td>
                    <Link
                      to={`/admin/cinema/update/${cinema._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(cinema._id);
                        refreshPage();
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CinemaAdmin;
