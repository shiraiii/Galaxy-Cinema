import React, { useContext } from "react"
import AppContext from "../../../../context/AppContext"

const HeaderMoreInfo = () => {
  const { setShowLoginModal, setShowModal, setShowSignUp } =
    useContext(AppContext)
  return (
    <>
      <a
        className="ml-3 text-sm text-[#777] capitalize cursor-pointer transition-all duration-300 hover:text-[#f26b38] "
        onClick={() => {
          setShowModal("true")
        }}
      >
        Đăng nhập
      </a>
      <div className="hover">
        <div className="join-button px-4 py-7 text-left md:cursor-pointer group transition-all duration-300 flex ">
          <a className="logo-header cursor-pointer logo__header grow-1 ">
            <img
              style={{ width: 99, height: 38 }}
              src="https://www.galaxycine.vn/_next/static/media/join-Gstar.24c52de9.svg"
            ></img>
          </a>
          <div className="absolute top-20 right-0 hidden group-hover:md:block hover:md:block z-[400] transition-all duration-300 ease-in-out">
            <div
              className="bg-white min-w-[849px] text-center border border-white border-solid rounded px-6 py-4"
              style={{
                boxShadow:
                  "0 6px 16px rgb(0 0 0 / .08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgb(0 0 0 / .05)",
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <div className="flex flex-col justify-start items-center gap-5 pt-6">
                  <img
                    width={"84"}
                    height={"80"}
                    className="w-[85px] h-[80px]"
                    style={{ color: "transparent" }}
                    src="https://www.galaxycine.vn/_next/static/media/icon-rules.9c822007.png"
                  ></img>
                  <h2 className="text-sm font-bold not-italic capitalize text-center">
                    Thể lệ
                  </h2>
                  <a className="w-[79px] h-8 leading-8 text-center text-[#f58020] border border-[#f58020] rounded text-[14px] font-bold not-italic hover:bg-[#f58020] hover:text-white transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] capitalize">
                    Chi tiết
                  </a>
                </div>
                <div className="flex flex-col justify-start items-center gap-5 pt-6">
                  <img
                    width={"125"}
                    height={"80"}
                    className="w-[126px] h-[80px]"
                    style={{ color: "transparent" }}
                    src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
                  ></img>
                  <h2 className="text-sm font-bold not-italic capitalize text-center">
                    Quyền lợi
                  </h2>
                  <a className="w-[79px] h-8 leading-8 text-center text-[#f58020] border border-[#f58020] rounded text-[14px] font-bold not-italic hover:bg-[#f58020] hover:text-white transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] capitalize">
                    Chi tiết
                  </a>
                </div>
                <div className="flex flex-col justify-start items-center gap-5 pt-6">
                  <img
                    width={"107"}
                    height={"80"}
                    className="w-[108px] h-[80px]"
                    style={{ color: "transparent" }}
                    src="https://www.galaxycine.vn/_next/static/media/faq.ce7c4be4.png"
                  ></img>
                  <h2 className="text-sm font-bold not-italic capitalize text-center">
                    Hướng dẫn
                  </h2>
                  <a className="w-[79px] h-8 leading-8 text-center text-[#f58020] border border-[#f58020] rounded text-[14px] font-bold not-italic hover:bg-[#f58020] hover:text-white transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] capitalize">
                    Chi tiết
                  </a>
                </div>
                <div className="flex flex-col justify-between items-center gap-5">
                  <img
                    width={"84"}
                    height={"80"}
                    className="w-[85px] h-[80px]"
                    style={{ color: "transparent" }}
                    src="https://www.galaxycine.vn/_next/static/media/bear_glx.d5131c11.png"
                  ></img>
                  <h2 className="text-sm font-bold not-italic capitalize text-center">
                    Đăng ký thành viên G-star nhận ngay ưu đãi
                  </h2>
                  <a
                    onClick={() => {
                      setShowModal(true)
                      setShowLoginModal(false)
                      setShowSignUp(true)
                    }}
                    className="w-[79px] h-8 leading-8 text-center border border-[#f58020] rounded text-[14px] font-bold not-italic hover:bg-[#f58020] hover:text-white transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] capitalize bg-[#f58020] text-white"
                  >
                    Đăng ký
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderMoreInfo
