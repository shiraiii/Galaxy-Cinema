import React from "react";

const SeatLayout = () => {
  return (
    <div className="seat__layout-screen">
      <p className="text-[12px] text-[#cccccc] text-center">Màn hình</p>
      <div className="border-2 border-[#ff8455] mt-3"></div>
      <div className="text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2">
        <div className="flex gap-5">
          <div>
            <span className="w-5 h-5 rounded bg-[#d0d0d0] inline-block align-middle"></span>
            <span className="ml-2">Ghế đã bán</span>
          </div>
          <div>
            <span className="w-5 h-5 rounded bg-[#f26b38] inline-block align-middle"></span>
            <span className="ml-2">Ghế đang chọn</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <span className="w-5 h-5 rounded border border-[#f2c94c] inline-block align-middle"></span>
            <span className="ml-2">Ghế VIP</span>
          </div>
          <div>
            <span className="w-5 h-5 rounded border border-[#d0d0d0] inline-block align-middle"></span>
            <span className="ml-2">Ghế đơn</span>
          </div>
          <div>
            <span className="w-[46px] h-5 rounded border border-[#034ea2] inline-block align-middle"></span>
            <span className="ml-2">Ghế đôi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
