import React from "react";

const EmptySeat = ({ setShowEmptySeatModal }) => {
  return (
    <>
      <div className="text-center w-full">
        <img
          alt="Icon Notice"
          className="w-10 h-10 inline-block"
          src="https://www.galaxycine.vn/_next/static/media/notice.e305ff4b.png"
        ></img>
        <p className="text-lg font-bold not-italic my-3">Thông báo</p>
      </div>
      <div className="modal__content w-full">
        <p className="text-sm font-normal text-[#333333] not-italic">
          Vui lòng chọn ghế
        </p>
        <div className="modal__footer flex justify-center gap-3 mt-6">
          <button className="rounded-md hover:bg-[#e38601] transition-all duration-300 min-w-[135px] w-full focus:outline-none focus:ring-[#e38601] text-sm text-center inline-flex items-center dark:hover:bg-[#e38601] dark:focus:ring-[#e38601] justify-center text-white bg-primary w-[150px] h-10 px-5 py-2.5 text-sm capitalize font-bold rounded">
            <span
              onClick={() => {
                setShowEmptySeatModal(false);
              }}
              className="block"
            >
              Đóng
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptySeat;
