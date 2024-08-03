import React, { useState, useEffect } from "react"

const Sidenav = ({ onClose, user, signOut }) => {
  const [menus, setMenus] = useState([{}])
  useEffect(() => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((data) => setMenus(data))
  }, [])
  return (
    <nav className="fixed pr-4 md:px-11 z-[1030] block w-[287px] md:w-[346px] top-0 bottom-0 h-full bg-white transition-all duration-500 ease-in-out pl-8 pt-6 overflow-hidden translate-x-[0] -right-[0] screen1200:hidden">
      <div className="flex justify-end">
        <button onClick={() => onClose(false)}>
          <span>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </button>
      </div>
      <div className="mt-4">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute top-[30%] left-[5%] text-[#333333]"></i>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full border rounded h-[40px] py-2 outline-none border-[#D0D0D0] px-10"
          ></input>
        </div>
      </div>
      {user ? (
        <>
          <div className="flex gap-2 mt-4 justify-between">
            <a className="md:hidden block text-center w-full">
              <img
                className="max-w-min w-[87px] h-[27px] inline-block object-cover duration-500 ease-in-out group-hover:opacity-100"
                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.01407df7.png"
              ></img>
            </a>

            <div className="flex items-center flex-wrap justify-end flex-auto mr-1 hidden"></div>
          </div>
          <div className="px-2 py-2 relative items-center text-left md:cursor-pointer group transition-all duration-500 ease-in-out flex">
            <div className="w-[40px] h-[40px] leading-[62px] text-center rounded-full bg-[#D0D0D0] border-4 border-solid border-[#E9E9E2] flex-none mr-4">
              <img
                alt="Avatar"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover duration-500 ease-in-out group-hover:opacity-100"
                src="https://www.galaxycine.vn/_next/static/media/user_default.b1a2ce07.png"
              ></img>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2 mt-4 justify-between">
            <a className="md:hidden block text-center w-full">
              <img
                className="max-w-min w-[87px] h-[27px] inline-block object-cover duration-500 ease-in-out group-hover:opacity-100"
                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.01407df7.png"
              ></img>
            </a>
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center flex-wrap justify-center flex-auto mr-1">
                <a className="cursor-pointer logo__header grow-0">
                  <img src="https://www.galaxycine.vn/_next/static/media/join-Gstar.24c52de9.svg"></img>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 flex flex-col">
        <ul className="flexd flex-col justify-start items-start grow-0 h-full">
          {menus?.map((menu, menuKey) => {
            return (
              <div
                key={menuKey}
                className="text-left md:cursor-pointer group transition-all capitalize pb-2"
              >
                <a className="flex text-sm justify-start items-center md:pr-0 pr-5 group group-[.is-active]:text-[#F58020] transition-all duration-100 ease-in-out">
                  {menu.name}
                  <span className="text-xs ml-2 block transition-all text-[#777777]">
                    <i className="fa-solid fa-angle-down"></i>
                  </span>
                </a>
                {menu.child && (
                  <section className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-[.is-active]:max-h-[500px] group[.is-active]:block hidden pl-5 w-full">
                    <ul>
                      {menus?.map((child, childKey) => {
                        return (
                          <li
                            key={childKey}
                            className="text-sm text-black xl:hover:pl-0.5 xl:hover:border-[#fd841f] xl:hover:bg-[#fb770b1a]"
                          >
                            <a className="block py-1 capitalize">
                              {child.name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                )}
              </div>
            )
          })}
        </ul>
        {user ? (
          <a
            className="md:hidden block fixed -bottom-1 z-[999] left-0 bg-white w-full h-10 text-sm text-black text-center py-2 hover:text-[#f26b38] hover:border-l-4 hover:border-[#fd841f] hover:bg-white transition-all duration-300"
            onClick={signOut}
          >
            <i className="fa-solid fa-right-from-bracket mr-2 rotate-180"></i>
            Đăng xuất
          </a>
        ) : null}
      </div>
    </nav>
  )
}

export default Sidenav
