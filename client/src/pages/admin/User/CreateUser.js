import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [roles, setRoles] = useState();

  const [userInput, setUserInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    roles: [],
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/user/createUser", {
        userInput,
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/user");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex h-auto justify-center items-center">
      <div className="w-full bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <label
            htmlFor="fullname"
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
              value={userInput.name}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="email"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Email
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="email"
              placeholder="Nhập email"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="email"
              value={userInput.email}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="phone"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Số điện thoại
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="phone"
              placeholder="Nhập số điện thoại"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="phone"
              value={userInput.phone}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="password"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Mật khẩu
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="false"
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="password"
              value={userInput.password}
              onChange={onChangeHandle}
            ></input>
          </span>
          <label
            htmlFor="roles"
            className="text-xs block font-bold not-italic text-[#777777]"
          >
            Role 1
          </label>
          <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
            <input
              required
              autoComplete="true"
              type="text"
              id="roles"
              placeholder="Roles"
              className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
              name="phone"
              value={userInput.roles}
              onChange={onChangeHandle}
            ></input>
          </span>
          <button className="bg-blue-500 text-white rounded px-2 py-1">
            Thêm
          </button>
        </form>
      </div>
      <Link to={"/admin"} className="bg-red-500 text-white rounded px-2 py-1">
        Back
      </Link>
    </div>
  );
};

export default CreateUser;
