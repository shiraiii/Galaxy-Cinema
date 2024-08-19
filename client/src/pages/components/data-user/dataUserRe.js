import React from "react"
import AppContext from "../../../context/AppContext"
import { useContext } from "react"
const DataUserResponsive = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const dataString = sessionStorage.getItem("userInfo")
  const data = JSON.parse(dataString)

  return (
    <div className="px-2 py-2 relative items-center text-left md:cursor-pointer group transition-all duration-500 ease-in-out flex ">
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
          <p className="flex-auto flex flex-col text-sm font-bold not-italic justify-start md:pr-0 group hover:text-orange-500 transition-all duration-500 ease-in-out capitalize">
            {data.userName}
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
    </div>
  )
}

export default DataUserResponsive
