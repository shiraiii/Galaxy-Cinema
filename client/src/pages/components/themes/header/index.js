import React, { useState, useEffect, useContext } from "react"
import { memo } from "react"
import "../header/style.css"
import "../../../../../src/index.css"
import LoginModal from "../../loginModal/loginModal"
import Sidenav from "../../sidenav/sidenav"
import SignUp from "../../signup/signup"
import DataUser from "../../data-user/dataUser"
import AppContext from "../../AppContext"

const Header = () => {
  const [menus, setMenus] = useState([{}])
  const [movies, setMovies] = useState([{}])
  const [showModal, setShowModal] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSideNav, setShowSideNav] = useState(false)
  const { state, dispatch } = useContext(AppContext)
  const { user } = state
  const signOut = () => {
    localStorage.removeItem("token")
    dispatch({ type: "CURRENT_USER", payload: null })
  }
  useEffect(() => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((data) => setMenus(data))
  }, [])

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
  }, [])
  return (
    <>
      <header className="Header_header_iG0T4 pt-5 pb-2 lg:pt-3">
        {showSideNav && (
          <div className="bg-[#343a40] opacity-60 fixed top-0 right-0 bottom-0 left-0 z-[1020] overflow-hidden w-screen h-screen transition-all duration-500 ease-in-out  screen:1200:hidden"></div>
        )}
        <div className="my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 screen1200:max-w-6xl lg:max-w-4xl md:max-w-4xl lg:px-0 md:px-4 sm:px-[45px] px-[16px]">
          <nav className="flex justify-start justify-items-center items-center flex-row">
            <a
              className="header-logo logo__header grow-0 md:mr-[40px] mr-[20px] "
              href="/"
            >
              <img
                style={{ width: 115, height: 60 }}
                className="max-w-min w-[77px] h-[40px] lg:w-[115px] lg:h-[60px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                alt="Galaxy - Cinema"
                src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png"
              ></img>
            </a>
            <a className="screen1200:hidden grow text-left block mr-4">
              <img
                className="max-w-min w-[84px] h-[27px] lg:w-[112px] lg:h-[36px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
              ></img>
            </a>
            <div className="hidden screen1200:flex screen1200:grow screen1200:basis-full items-center gap-8 px-5 transition-all duration-300 ease-in-out">
              <div className="hidden nav-item grow md:flex items-center justify-center">
                <a className="md:block mr-4 hidden" href="#">
                  <img
                    style={{ width: 112, height: 36 }}
                    className="max-w-min w-[84px] h-[27px] lg:w-[112px] lg:h-[36px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                    src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                  ></img>
                </a>
                {menus?.slice(0, 1).map((menu, menuKey) => {
                  return (
                    <div key={menuKey} className="hover relative">
                      <div className="px-3 text-left: md:cursor-pointer group hover:text-orange-500 transition-all duration-300">
                        <a className="py-7 nav-item-text flex text-sm justify-between items-center md:pr-0 pr-5 group hover:text-orange-500 transition-all duration-300 ease-in-out not-italic">
                          {menu?.name}
                          <span className="text-xs md:ml-2 md:block group-hover:text-orange-500 transition-all duration-300 ease-in-out text-[#777777]">
                            <i className="fa-solid fa-angle-down"></i>
                          </span>
                        </a>
                        <div className="absolute top-[65px] -left-[45px] hidden group-hover:md:block hover:md:block z-[800] transition-all duration-300 ease-in-out">
                          <div
                            className="bg-white min-w-[250px] border border-white border-solid rounded px-6 py-4"
                            style={{
                              boxShadow:
                                "0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05)",
                            }}
                          >
                            {menu.child &&
                              menu.child
                                .slice(0, 1)
                                .map((childItem, childKey) => (
                                  <div key={childKey} className="movie__show">
                                    <div>
                                      <span className="border-l-4 border-solid border-[#034ea2]"></span>
                                      <a
                                        type="button"
                                        className="text-base font-normal text-[#333333] pl-2 inline cursor-pointer uppercase hover:text-orange-500 transition-all duration-300 ease-in-out"
                                      >
                                        {childItem?.name}
                                      </a>
                                      <ul className="flex flex-row gap-7 justify-between">
                                        {movies
                                          ?.slice(0, 4)
                                          .map((movie, movieKey) => {
                                            return (
                                              <li
                                                key={movieKey}
                                                className="text-sm text-black py-2 transition-all duration-300"
                                              >
                                                <div className="inline-block whitespace-nowrap relative max-w-full w-[140px] h-[200px]">
                                                  <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full">
                                                    <div className="object-cover rounded relative card__img max-w-full">
                                                      <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#000000] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
                                                        <div className="card__hover__content flex flex-col justify-center items-center w-full h-full">
                                                          <a
                                                            type="button"
                                                            className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                          >
                                                            <img
                                                              src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                                                              className="mr-2"
                                                              style={{
                                                                color:
                                                                  "transparent",
                                                              }}
                                                            ></img>
                                                            Mua vé
                                                          </a>
                                                        </div>
                                                      </div>
                                                      <a>
                                                        <img
                                                          className="undefined object-cover duration-500 ease-in-out group-hover:opacity-100"
                                                          src={movie.movieImg}
                                                        ></img>
                                                      </a>
                                                      <div className="votes">
                                                        <p className="absolute right-[5px] bottom-10">
                                                          <span>
                                                            <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                                                          </span>
                                                          <span className="text-[18px] font-bold text-white">
                                                            {movie.movieRating}
                                                          </span>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="Card_card__title__kFoFc mt-2"
                                                    style={{ width: "128px" }}
                                                  >
                                                    <a
                                                      type="button"
                                                      className="text-sm font-semibold not-italic w-[140px]"
                                                    >
                                                      {movie.name}
                                                    </a>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          })}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                            {menu.child &&
                              menu.child
                                .slice(1, 2)
                                .map((childItem, childKey) => (
                                  <div key={childKey} className="movie__show">
                                    <div>
                                      <span className="border-l-4 border-solid border-[#034ea2]"></span>
                                      <a
                                        type="button"
                                        className="text-base font-normal text-[#333333] pl-2 inline cursor-pointer uppercase hover:text-orange-500 transition-all duration-300 ease-in-out"
                                      >
                                        {childItem?.name}
                                      </a>
                                      <ul className="flex flex-row gap-7 justify-between">
                                        {movies
                                          ?.slice(6, 10)
                                          .map((movie, movieKey) => {
                                            return (
                                              <li
                                                key={movieKey}
                                                className="text-sm text-black py-2 transition-all duration-300"
                                              >
                                                <div className="inline-block whitespace-nowrap relative max-w-full w-[140px] h-[200px]">
                                                  <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full">
                                                    <div className="object-cover rounded relative card__img max-w-full">
                                                      <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#000000] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
                                                        <div className="card__hover__content flex flex-col justify-center items-center w-full h-full">
                                                          <a
                                                            type="button"
                                                            className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                                                          >
                                                            <img
                                                              src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                                                              className="mr-2"
                                                              style={{
                                                                color:
                                                                  "transparent",
                                                              }}
                                                            ></img>
                                                            Mua vé
                                                          </a>
                                                        </div>
                                                      </div>
                                                      <a>
                                                        <img
                                                          className="undefined object-cover duration-500 ease-in-out group-hover:opacity-100"
                                                          src={movie.movieImg}
                                                        ></img>
                                                      </a>
                                                      <div className="votes">
                                                        <p className="absolute right-[5px] bottom-10">
                                                          <span>
                                                            <i className="fa-solid fa-star text-yellow-300 mr-5 text-[12px]"></i>
                                                          </span>
                                                          <span className="text-[18px] font-bold text-white">
                                                            {movie.movieRating}
                                                          </span>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="Card_card__title__kFoFc mt-2"
                                                    style={{ width: "128px" }}
                                                  >
                                                    <a
                                                      type="button"
                                                      className="text-sm font-semibold not-italic w-[140px]"
                                                    >
                                                      {movie.name}
                                                    </a>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          })}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {menus?.slice(1, 4).map((menu, menuKey) => (
                  <div key={menuKey} className="hover relative">
                    <div className="px-3 text-left md:cursor-pointer group hover:text-orange-500 transition-all duration-300">
                      <a className="py-7 nav-item-text flex text-sm justify-between items-center md:pr-0 pr-5 group hover:text-orange-500 transition-all duration-300 ease-in-out not-italic">
                        {menu?.name}
                        <span className="text-xs md:ml-2 md:block group-hover:text-orange-500 transition-all duration-300 ease-in-out text-[#777777]">
                          <i className="fa-solid fa-angle-down"></i>
                        </span>
                      </a>
                      {menu.child && (
                        <div>
                          <div className=" absolute top-[65px] -left-[45px] hidden group-hover:md:block hover:md:block z-[800] ">
                            <div
                              className="bg-white min-w-[200px] text-center border border-white border-solid rounded px-6 py-4"
                              style={{
                                boxShadow:
                                  "0 6px 16px rgb(0 0 0 / .08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgb(0 0 0 / .05)",
                              }}
                            >
                              <ul>
                                {menu.child.map((childItem, childKey) => (
                                  <li
                                    key={`${menuKey}-${childKey}`}
                                    className="text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300"
                                  >
                                    <a className="block py-2">
                                      {childItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden screen1200:flex screen1200:grow screen1200:basis-6/12 screen1200:justify-end uppercase items-center relative transition-all duration-300">
              <div className="search-icon mr-4">
                <a
                  className="cursor-pointer font-light text-sm text-[#777]"
                  title="Tím kiếm"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </a>
              </div>
              {user ? (
                <>
                  <DataUser signOut={signOut} user={user}></DataUser>
                </>
              ) : (
                <>
                  <a
                    className="ml-3 text-sm text-[#777] capitalize cursor-pointer transition-all duration-300 hover:text-[#f26b38] "
                    onClick={() => setShowModal("true")}
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
                      <div className="absolute top-21 right-0 hidden group-hover:md:block hover:md:block z-[400] transition-all duration-300 ease-in-out">
                        <div
                          className="bg-white min-w-[849px] text-center border border-white border-solid rounded px-6 py-4"
                          style={{
                            boxShadow:
                              "0 6px 16px rgb(0 0 0 / .08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgb(0 0 0 / .05)",
                          }}
                        >
                          <div className="grid grid-cols-5 gap-5">
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
                              <a className="w-[79px] h-8 leading-8 text-center text-[#f58020] border border-[#f58020] rounded text-[14px] font-bold not-italic hover:bg-[#f58020] hover:text-white transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] capitalize">
                                Đăng ký
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex md:grow md:basis-6/12 justify-end screen1200:hidden">
              <a className="text-sm text-[#777] capitalize cursor-pointer transition-all duration-300 hover:text-[#f26b38]">
                <span onClick={() => setShowModal(true)}>
                  <i className="fa-regular fa-user inline align-baseline mr-1"></i>
                  Đăng nhập
                </span>
              </a>
              <button className="ml-4">
                <span onClick={() => setShowSideNav(true)}>
                  <i className="fa-solid fa-bars"></i>
                </span>
              </button>
            </div>
          </nav>
        </div>
        {showSideNav && (
          <Sidenav user={user} onClose={setShowSideNav}></Sidenav>
        )}
      </header>
      {showModal && (
        <div>
          <div className="react-responsive-modal-root" data-testid="root">
            <div
              className="react-responsive-modal-overlay"
              data-testid="overlay"
              aria-hidden="true"
              style={{
                animation:
                  "300ms ease 0s 1 normal none running react-responsive-modal-overlay-in",
              }}
            ></div>
            <div
              className="react-responsive-modal-container react-responsive-modal-containerCenter"
              data-testid="modal-container"
            >
              <div
                className="react-responsive-modal-modal modal-sx px-6 py-10 m-0"
                role="dialog"
                aria-modal="true"
                data-testid="modal"
                tabIndex="-1"
                style={{
                  animation:
                    "300ms ease 0s 1 normal none running react-responsive-modal-modal-in",
                }}
              >
                <LoginModal onClose={setShowModal} />
                <div className="log__footer text-[14px] pt-6 border-t-2 text-center">
                  <span>Bạn chưa có tài khoản</span>
                  <button
                    type="button"
                    className="rounded-md hover:bg-[#e38601] transition-all duration-300 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center border border-[#ff953f] text-[#f58020] hover:text-white w-auto px-6 py-[6px] font-light"
                    onClick={() => {
                      setShowSignUp("true")
                      setShowModal(false)
                    }}
                  >
                    <span className="block">Đăng ký</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSignUp && (
        <div>
          <div className="react-responsive-modal-root" data-testid="root">
            <div
              className="react-responsive-modal-overlay"
              data-testid="overlay"
              aria-hidden="true"
              style={{
                animation:
                  "300ms ease 0s 1 normal none running react-responsive-modal-overlay-in",
              }}
            ></div>
            <div
              className="react-responsive-modal-container react-responsive-modal-containerCenter"
              data-testid="modal-container"
            >
              <div
                className="react-responsive-modal-modal modal-sx px-6 py-10 m-0"
                role="dialog"
                aria-modal="true"
                data-testid="modal"
                tabIndex="-1"
                style={{
                  animation:
                    "300ms ease 0s 1 normal none running react-responsive-modal-modal-in",
                }}
              >
                <SignUp onClose={setShowSignUp} />
                <div className="text-[14px] pt-6 border-t-2 text-center">
                  <span>Bạn đã có tài khoản?</span>
                  <button
                    type="button"
                    className="rounded-md hover:bg-[#e38601] transition-all duration-300 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center border border-[#ff953f] text-[#f58020] hover:text-white w-auto px-6 py-[6px] font-light"
                    onClick={() => {
                      setShowModal(true)
                      setShowSignUp(false)
                    }}
                  >
                    <span className="block">Đăng nhập</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(Header)
