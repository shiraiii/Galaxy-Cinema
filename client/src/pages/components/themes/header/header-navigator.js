import React from "react"
import MovieCardHeader from "../../movie-card/moviecard-header"
import { useContext } from "react"
import AppContext from "../../../../context/AppContext"

const HeaderNavigator = () => {
  const { nowShowingMovies, upcomingMovies, menus, cinemas } =
    useContext(AppContext)

  return (
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
                      menu.child.slice(0, 1).map((childItem, childKey) => (
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
                              <MovieCardHeader
                                movies={nowShowingMovies}
                              ></MovieCardHeader>
                            </ul>
                          </div>
                        </div>
                      ))}
                    {menu.child &&
                      menu.child.slice(1, 2).map((childItem, childKey) => (
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
                              <MovieCardHeader
                                movies={upcomingMovies}
                              ></MovieCardHeader>
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
        {menus?.slice(1, 3).map((menu, menuKey) => (
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
                            <a className="block py-2">{childItem.name}</a>
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
        {menus?.slice(3, 4).map((menu, menuKey) => (
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
                        {cinemas.map((cinema, index) => (
                          <li
                            key={index}
                            className="text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300"
                          >
                            <a className="block py-2">{cinema.name}</a>
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
  )
}

export default HeaderNavigator
