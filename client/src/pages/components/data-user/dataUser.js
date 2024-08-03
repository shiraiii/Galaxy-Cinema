import React, { useEffect } from "react"
import AppContext from "../AppContext"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import userDetails from "../userDetails/userDetails"
const DataUser = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const { user } = state
  const navigate = useNavigate()
  const dataString = sessionStorage.getItem("userInfo")
  const data = JSON.parse(dataString)

  return (
    <div className="md:px-2 py-4 relative items-center text-left md:cursor-pointer group transition-all duration-500 ease-in-out md:flex hidden">
      <div className="w-[40px] h-[40px] leading-[62px] text-center rounded-full bg-[#D0D0D0] border-4 border-solid border-[#E9E9E2] flex-none mr-4">
        <img
          alt="Avatar"
          height={40}
          width={40}
          style={{ color: "transparent" }}
          className="w-full h-full rounded-full object-cover duration500 ease-in-out group-hover:opacity-100"
          src="https://www.galaxycine.vn/_next/static/media/user_default.b1a2ce07.png"
        ></img>
      </div>
      <div className="flex flex-col flex-auto">
        <div className="flex items-center justify-center gap-[6px]">
          <img
            alt="Logo Star Mini"
            loading="lazy"
            width={20}
            height={30}
            className="inline-block w-[20px] h-[30px]"
            src="https://cdn.galaxycine.vn/media/2020/5/15/s_1589511977688.png"
            style={{ color: "transparent" }}
          ></img>
          <p className="flex-auto md:flex hidden flex-col text-sm font-bold not-italic justify-start md:pr-0 group hover:text-orang-500 transition-all duration-500 ease-in-out capitalize">
            {data.userName}
            <span className="block text-xs font-light not-italic">Star</span>
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="w-[20px] text-center">
            <img
              alt="Logo Gift"
              loading="lazy"
              width={12}
              height={12}
              className="inline-block w-[12px] h-[12px]"
              src="https://www.galaxycine.vn/_next/static/media/icon-gift.190935e4.png"
              style={{ color: "transparent" }}
            ></img>
          </div>
          <span className="flex-auto text-sm font-semibold not-italic mt-1 capitalize">
            0 Start
          </span>
        </div>
      </div>
      <button
        type="button"
        className="md:py-7 md:hidden flex text-sm font-bold not-italic justify-between items-center md:pr-0 group hover:text-orange-500 transition-all duration-500 ease-in-out"
      >
        {data.userName}
      </button>
      <div className="absolute left-0 w-full min-w-[150px] max-w-[220px] top-20 hidden group-hover:md:block hover:md:block z-[500] transition-all duration-500 ease-in-out">
        <div
          className="bg-white text-center border border-white border-solid rounded"
          style={{
            boxShadow:
              "rgba(0,0,0,0.08) 0px 6px 16px 0px , rgba(0,0,0,0.12) 0px 3px 6px -4px, rgba(0,0,0,0.05) 0px 9px 28px 8px",
          }}
        >
          <ul className="flex flex-col">
            <li>
              <Link
                to={"/userDetails"}
                className="text-sm text-left text-black py-2 px-[18px] hover:text-[#f26b38] hover:border-l-4 hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300 flex items-center justify-between capitalize"
                type="button"
              >
                <i className="fa-solid fa-id-badge"></i>
                <span className="grow ml-4">Tài khoản</span>
              </Link>
            </li>
            {/* đánh dấu trạng thái admin sau đó ẩn lịch sử ròi thay bằng đường dẫn đến admin */}
            {user && data.roles === "admin" ? (
              <li>
                <a
                  className="text-sm text-left text-black py-2 px-[18px] hover:text-[#f26b38] hover:border-l-4 hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300 flex items-center justify-between capitalize"
                  type="button"
                >
                  <i className="fa-solid fa-list-ol"></i>
                  <span className="grow ml-4">Lịch sử</span>
                </a>
              </li>
            ) : (
              <li>
                <Link
                  to={"/admin"}
                  className="text-sm text-left text-black py-2 px-[18px] hover:text-[#f26b38] hover:border-l-4 hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300 flex items-center justify-between capitalize"
                  type="button"
                >
                  <i className="fa-solid fa-list-ol"></i>
                  <span className="grow ml-4">Admin</span>
                </Link>
              </li>
            )}

            <li>
              <a className="text-sm text-left text-black py-2 px-[18px] hover:text-[#f26b38] hover:border-l-4 hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300 flex items-center justify-between capitalize">
                <i className="fa-solid fa-right-from-bracket rotate-180"></i>
                <span className="grow ml-4" onClick={props.signOut}>
                  Đăng xuất
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DataUser
