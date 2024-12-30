import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const Users = () => {
  const { id } = useParams();
  const { token } = useContext(AppContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/user/getAllUser")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const filterSort = data
    .filter((a) => a.id === id)
    .sort((a, b) => (a.roles > b.roles ? 1 : -1));
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/api/v1/user/deleteUser/" + id, {
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
          to="/admin/create"
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
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Roles</th>
            </tr>
          </thead>
          <tbody>
            {filterSort?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.roles}</td>
                  <td>
                    <Link
                      to={`/admin/update/${user._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cập nhật
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(user._id);
                        refreshPage();
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Xoá
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

export default Users;
