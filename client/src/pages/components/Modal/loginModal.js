import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./loginModal.css"
import axios from "axios"
import AppContext from "../../../context/AppContext"

const LoginModal = () => {
  const navigate = useNavigate()
  const {
    dispatch,
    setShowLoginModal,
    setShowSignUp,
    setShowModal,
    isAuth,
    setIsAuth,
    redirectPath,
    setRedirectPath,
  } = useContext(AppContext)
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  axios.defaults.withCredentials = true
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault()
      const option = {
        method: "POST",
        url: "http://localhost:5000/api/v1/auth/login",
        mode: "cors",
        data: userInput,
      }
      const response = await axios(option)
      const { token, userName, roles, phone } = response.data.data
      const userString = JSON.stringify(response.data.data)
      sessionStorage.setItem("userInfo", userString)
      window.localStorage.setItem("token", token)
      dispatch({ type: "CURRENT_USER", payload: { userName } })
      setIsAuth(true)
      if (roles == "Admin") {
        setShowModal(false)
        // navigate("/admin")
      }
      if (roles == "User") {
        setShowModal(false)
        if (redirectPath) {
          navigate(redirectPath)
          setRedirectPath(null)
        }
      }
    } catch (err) {
      setErrorMessage(err.response.data.message)
    }
  }
  return (
    <>
      <div
        className="react-responsive-modal-modal modal-sx px-6 py-10 m-0 "
        role="dialog"
        aria-modal="true"
        data-testid="modal"
        tabIndex="-1"
        style={{
          animation:
            "300ms ease 0s 1 normal none running react-responsive-modal-modal-in",
        }}
      >
        <div className="login__wrapper sm:w-[350px]">
          <div className="login__icon text-center mb-4">
            <img
              src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
              width="190"
              height="120"
              className="my-0 mx-auto object-cover duration-500 ease-in-out group-hover:opacity-100"
              style={{ color: "transparent" }}
            ></img>
            <h5 className="text-lg font-bold not-italic py-2 capitalize">
              Đăng nhập tài khoản
            </h5>
          </div>
          <div className="login__form">
            <form onSubmit={onSubmitHandle}>
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
              <label
                htmlFor="email"
                className="text-xs block font-bold not-italic text-[#777777]"
              >
                Email
              </label>
              <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
                <input
                  autoComplete="true"
                  type="text"
                  id="email"
                  placeholder="Nhập Email"
                  className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                  name="email"
                  value={userInput.email}
                  onChange={onChangeHandle}
                ></input>
              </span>
              <br></br>
              <label
                htmlFor="password"
                className="text-xs block font-bold not-italic text-[#7777777]"
              >
                Mật khẩu
              </label>
              <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
                <input
                  autoComplete="true"
                  type="password"
                  id="password"
                  placeholder="Nhập Mật Khẩu"
                  className="bg-transparent w-full h-9 focus:ring-2 focus:ouline-blue-500 focus:rounded px-2"
                  name="password"
                  value={userInput.password}
                  onChange={onChangeHandle}
                ></input>
                <i className="fa-solid fa-eye-slash"></i>
              </span>
              <button
                type="submit"
                className="rounded-md hover:bg-[#e38601] transition-all duration-30 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center text-white bg-[#F58020] w-full h-full px-5 py-2.5 uppercase mt-5 flase"
              >
                <span className="block">Đăng nhập</span>
              </button>
              <div className="text-start mt-[14px] mb-4">
                <a className="inline cursor-pointer text-[14px] text-[#212529] font-light hover:text-[#f26b38] transition-all duration-300">
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
        <button
          className="react-responsive-modal-closeButton"
          onClick={() => {
            setShowModal(false)
            setShowLoginModal(true)
            setShowSignUp(false)
          }}
        >
          <span
            className="inline-flex bg-[#ececec] rounded-full w-[24px] h-[24px] items-center justify-center"
            data-dismiss="modal"
            aria-label="Close"
          >
            <img
              src="https://www.galaxycine.vn/_next/static/media/icon-close.7e22f021.svg"
              width="30"
              height="30"
              className="w-[12px] h-[12px]"
              style={{ color: "transparent" }}
            ></img>
          </span>
        </button>
        <div className="log__footer text-[14px] pt-6 border-t-2 text-center">
          <span>Bạn chưa có tài khoản</span>
          <button
            type="button"
            className="rounded-md hover:bg-[#e38601] transition-all duration-300 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center border border-[#ff953f] text-[#f58020] hover:text-white w-auto px-6 py-[6px] font-light"
            onClick={() => {
              setShowSignUp(true)
              setShowLoginModal(false)
            }}
          >
            <span className="block">Đăng ký</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default LoginModal
