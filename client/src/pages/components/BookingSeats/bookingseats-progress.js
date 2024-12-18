import React from "react";

const BookingSeatProgress = ({ activeTab, setActiveTab }) => {
  const tabTitles = [
    "Chọn phim / Rạp / Suất",
    "Chọn ghế",
    "Thanh toán",
    "Xác nhận",
  ];

  return (
    <div className="booking__progress-bar flex justify-center items-center flex-nowrap bg-white relative md:mb-8 mb-0 w-full overflow-auto">
      <ul className="flex justify-center items-center text-[#d0d0d0] md:text-base text-[12px] font-semibold w-full flex-nowrap">
        {tabTitles.map((title, index) => (
          <li
            key={index}
            className={`pt-4 mb-4 pl-0 ${
              activeTab === index
                ? "text-[#034ea2]"
                : activeTab > index
                ? "text-[#588ECA]"
                : "text-[#d0d0d0]"
            }`}
          >
            <button className="md:mx-3 mx-1">{title}</button>
            <div
              className={`relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-[#D0D0D0] after:inline-block after:absolute after:left-0 after:h-[2px] after:w-full after:w-1/2 ${
                activeTab === index
                  ? "after:bg-[#034ea2] "
                  : activeTab > index
                  ? "after:bg-[#034ea2]"
                  : "after:bg-[#D0D0D0]"
              } after:w-1/2`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingSeatProgress;
