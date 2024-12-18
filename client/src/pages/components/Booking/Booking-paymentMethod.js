import React from "react";

const BookingPaymentMethod = () => {
  return (
    <div className="col-span-2 xl:order-first xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10 pb-32 ">
      <div className="bg-white p-4">
        <h3 className="text-lg mb-4 font-semibold">Khuyến mãi</h3>"
        <div className="md:mt-4 mt-2">
          <form autoComplete="off">
            <div className="mt-4 grid grid-cols-2 gap-4 xl:w-2/3 w-full">
              <div className="col-span-1">
                <label className="inline-block mb-1 text-[#333333] text-sm font-bold">
                  Mã khuyến mãi
                </label>
                <input
                  id="voucher-code"
                  type="text"
                  className="border w-full py-2 px-4"
                ></input>
              </div>
              <div className="col-span-1 flex items-start mt-7">
                <button className="bg-[#f58020] text-white text-sm rounded px-12 py-2 h-[42px]">
                  Áp dụng
                </button>
              </div>
            </div>
            <p className="text-sm text-[#ff0000] mt-2">
              "Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
            </p>
          </form>
        </div>
      </div>
      <div className="bg-white p-4 mt-8">
        <h3 className="text-lg mb-4 font-semibold">Phương thức thanh toán</h3>
        <div className="my-4">
          <ul className="leading-5 text-lg">
            <li className="mb-4 md:block flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#f58020] bg-gray-100 border-gray-300"
                defaultChecked
              ></input>
              <img
                alt="Thanh toan momo"
                width={100}
                height={100}
                src="https://www.galaxycine.vn/_next/static/media/momo.5e2f3c5f.png"
              ></img>
              <label className="inline-block md:text-base text-sm">
                Thanh toán momo
              </label>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-sm">
          <strong className="text-[#ff6464] font-semibold">(*)</strong>
          <span>
            Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu
            rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema.
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentMethod;
