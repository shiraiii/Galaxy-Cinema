import React from "react"
import Select from "react-dropdown-select"
import "./buysection.css"

const options = [
  {
    value: 1,
    label: "Leanne Graham",
  },
  {
    value: 2,
    label: "Ervin Howell",
  },
]
export const Buysection = () => (
  <div className="quick-buy hidden screen1200:grid absolute z-[500] grid-cols-11 max-w-6xl h-14 w-full shadow-2xl bg-white rounded left-2/4 bottom-14 translate-y-1/2 -translate-x-2/4 ">
    <div className="relative h-full col-span-3">
      <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
        1
      </span>
      <Select placeholder="Chọn phim" options={options} />
    </div>
    <div className="relative h-full col-span-2">
      <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
        2
      </span>
      <Select placeholder="Chọn Rạp" options={options} />
    </div>
    <div className="relative h-full col-span-2">
      <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
        3
      </span>
      <Select placeholder="Chọn Ngày" options={options} />
    </div>
    <div className="relative h-full col-span-2">
      <span className="number absolute bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full top-2/4 left-[3%] translate-x-[3%] -translate-y-[50%] ">
        4
      </span>
      <Select placeholder="Chọn Suất" options={options} />
    </div>
    <div className="relative h-full col-span-2">
      <button className="bg-primary w-full h-full rounded-sm" disabled>
        Mua vé nhanh
      </button>
    </div>
  </div>
)
