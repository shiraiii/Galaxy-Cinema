import React from "react"

const BookingSeatProgress = () => {
  return (
    <div className="booking__progress-bar flex justify-center items-center flex-nowrap bg-white relative md:mb-8 mb-0 w-full overflow-auto">
      <ul className="flex justify-center items-center text-[#d0d0d0] md:text-base text-[12px] font-semibold w-full flex-nowrap">
        <li className="pt-4 mb-4 pl-0 text-[#588ECA]">
          <button className="md:mx-3 mx-1">Chọn phim / Rạp / Suất</button>
          <div className="relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-[#034ea2] after:w-1/2 after:w-full "></div>
        </li>
        <li className="pt-4 mb-4 pl-0 text-[#034ea2]">
          <button className="md:mx-3 mx-1">Chọn ghế</button>
          <div className="relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-[#034ea2] after:w-1/2 after:w-full "></div>
        </li>
        <li className="pt-4 mb-4 pl-0">
          <button className="md:mx-3 mx-1">Chọn thức ăn</button>
          <div className="relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-[#034ea2]"></div>
        </li>
        <li className="pt-4 mb-4 pl-0">
          <button className="md:mx-3 mx-1">Thanh toán</button>
          <div className="relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-[#034ea2]"></div>
        </li>
        <li className="pt-4 mb-4 pl-0">
          <button className="md:mx-3 mx-1">Xác nhận</button>
          <div className="relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-[#034ea2]"></div>
        </li>
      </ul>
    </div>
  )
}

export default BookingSeatProgress
