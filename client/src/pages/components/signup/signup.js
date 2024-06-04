import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../AppContext"
import axios from "axios"

const SignUp = ({ onClose, openModal }) => {
  const [name, setName] = useState()
  const [validname, setValidName] = useState(false)

  const [email, setEmail] = useState()
  const [validEmail, setValidEmail] = useState(false)

  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState()
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const { dispatch } = useContext(AppContext)
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    roles: "",
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const onChangeSubmit = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault()
      const option = {
        method: "POST",
        url: "/api/v1/auth/register",
        data: userInput,
      }
      const response = await axios(option)
      const { token, userName } = response.data.data
      localStorage.setItem("token", token)
      dispatch({ type: "CURRENT_USER", payload: { userName } })
    } catch (err) {
      setErrorMessage(err.response.data.message)
    }
  }

  const userRef = useRef()
  const errRef = useRef()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(name)
    setValidName(result)
  }, [name])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  })

  useEffect(() => {
    const result = PWD_REGEX.test(userInput.password)
    setValidPassword(result)
    const match = userInput.password === matchPwd
    setValidMatch(match)
  }, [userInput.password, matchPwd])

  return (
    <>
      <div className="login__wrapper">
        <div className="login__icon text-center mb-3">
          <img
            src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
            className="my-0 mx-auto object-cover duration-500 ease-in-out group-hover:opacity-100"
          ></img>
          <h5 className="text-[18px] font-bold py-2 capitalize">
            Đăng ký tài khoản
          </h5>
        </div>
        <div className="login__form mb-8">
          <form onSubmit={onSubmitHandle}>
            {errorMessage &&
              (Array.isArray(errorMessage) ? (
                errorMessage.map((err) => <div className="">Error: {err}</div>)
              ) : (
                <div className="">Error: {errorMessage}</div>
              ))}
            <label
              htmlFor="name"
              className="text-xs block font-bold not-italic text-[#777777]"
            >
              Họ và tên
            </label>
            <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
              <input
                autoComplete="true"
                type="text"
                id="name"
                placeholder="Nhập họ và tên"
                className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                name="name"
                onChange={onChangeSubmit}
                value={userInput.name}
                required
                ref={userRef}
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
                type="text"
                id="email"
                placeholder="Nhập email"
                className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                name="email"
                value={userInput.email}
                onChange={onChangeSubmit}
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
                type="text"
                id="phone"
                placeholder="Nhập số điện thoại"
                className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                name="phone"
                value={userInput.phone}
                onChange={onChangeSubmit}
              ></input>
            </span>
            <label
              htmlFor="password"
              className="text-xs block font-bold not-italic text-[#777777]"
            >
              Mật khẩu
              <span className={validPassword ? "inline-block" : "hidden"}>
                <i className="fa-solid fa-circle-check text-green-500 ml-2"></i>
              </span>
              <span
                className={
                  validPassword || !userInput.password
                    ? "hidden"
                    : "inline-block"
                }
              >
                <i className="fa-solid fa-circle-xmark text-red-500 ml-2"></i>
              </span>
            </label>
            <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
              <input
                required
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                name="password"
                value={userInput.password}
                onChange={onChangeSubmit}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              ></input>
            </span>
            <p
              id="pwdnote"
              className={passwordFocus && !validPassword ? "block" : "hidden"}
            >
              Mật khẩu phải có 8 đến 24 ký tự
              <br />
              Phải bao gồm ký tự đặc biệt
              <br />
              Chữ in hoa và số
            </p>
            <label
              htmlFor="confirmPassword"
              className="text-xs block font-bold not-italic text-[#777777]"
            >
              Nhập lại mật khẩu
              <span
                className={validMatch && matchPwd ? "inline-block" : "hidden"}
              >
                <i className="fa-solid fa-circle-check text-green-500 ml-2"></i>
              </span>
              <span
                className={validMatch || !matchPwd ? "hidden" : "inline-block"}
              >
                <i className="fa-solid fa-circle-xmark text-red-500 ml-2"></i>
              </span>
            </label>
            <span className="w-full mb-1 relative h-auto border inline-flex items-center min-w-0 text-sm bg-white rounded transition-all duration-300">
              <input
                required
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                className="bg-transparent w-full h-9 focus:ring-2 focus:outline-blue-500 focus:rounded px-2"
                name="confirmPassword"
                onChange={(e) => setMatchPwd(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              ></input>
            </span>
            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? "block" : "hidden"}
            >
              Xác nhận mật khẩu phải trùng với mật khẩu
            </p>
            <button
              type="submit"
              className="rounded-md hover:bg-[#e38601] transition-all duration-300 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center text-white bg-[#F58020] w-full h-full px-5 py-2.5 uppercase mt-5"
              disabled={!validMatch ? true : false}
            >
              <span className="block">Hoàn thành́</span>
            </button>
          </form>
        </div>
      </div>
      <button
        className="react-responsive-modal-closeButton"
        onClick={() => onClose(false)}
      >
        <span className="inline-flex bg-[#ececec] rounded-full w-[24px] h-[24px] items-center justify-center">
          <img
            src=" https://www.galaxycine.vn/_next/static/media/icon-close.7e22f021.svg"
            width="30"
            height="30"
            className="w-[12px] h-[12px]"
            style={{ color: "transparent" }}
          ></img>
        </span>
      </button>
    </>
  )
}

export default SignUp
