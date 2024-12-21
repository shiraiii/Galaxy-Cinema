import React from "react";
import AppContext from "../../../context/AppContext";

const BookingPaymentMethod = () => {
  const { setMethod, method } = React.useContext(AppContext);

  const handleMethodChange = (method) => {
    setMethod(method);
    console.log(method);
  };
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
                value="HSBC"
                checked={method === "HSBC"}
                onChange={() => handleMethodChange("HSBC")}
                className="w-4 h-4 text-[#f58020] bg-gray-100 border-gray-300"
              ></input>
              <img
                alt="Thanh toan payoo"
                width={50}
                height={50}
                className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100"
                src="https://cdn.galaxycine.vn/media/2020/10/20/hsbc-icon_1603203578522.png"
              ></img>
              <label className="inline-block md:text-base text-sm">
                HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE
              </label>
            </li>

            <li className="mb-4 md:block flex items-center">
              <input
                value="stripe"
                checked={method === "stripe"}
                onChange={() => handleMethodChange("stripe")}
                type="radio"
                className="w-4 h-4 text-[#f58020] bg-gray-100 border-gray-300"
              ></input>
              <img
                alt="Thanh toan payoo"
                width={50}
                height={50}
                className="inline-block mx-2 object-cover duration-500 ease-in-out group-hover:opacity-100"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEVjW/////9gWP/8/P+rp/97df9bUv9fV/9SSP/LyP9eVf9cU//Ozf9ZUP/u7f/s6/9WTf9pYf9lXf93cf+Lhv+zsP9sZP9xav/08//V0/+VkP9uZ//Dwf9/eP+3tP+7uP/5+P+gm//m5f6Pif+mov+Ffv7e3f+uq/9PRf/Z2P+1sv/j4v+jnv/S0P/HxP+Hgf9KP/9+MXCEAAADeUlEQVR4nO3Ya3eiOACHcQgVbGIU8IKiFvFGd9fa/f6fbkmC1u7oTPfs7JFxn98LGnIONn9zRc8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgFYQUahVcu9W/Jcmm+K34E3fuxk/i5BafK7Rb37t+UESam9ZPu8+R9S9B0qoe9M6zEb+rdIk7D1GwrjvX0k4C/ZFPhc3nvklREprJesI8cAkHClRl4WwVyW9idRxGNVLas3UaBVdPhzqMLr50a2gvNF4sfg9z6RwCctOZ5mknfo6CZfbUmSmmIlsV/PC5fj4sjtnVGL0cizyVN01wvep8cp3/si6g6bojzrmuijqi5zZeditbHp74+87LpI6TO396im8c4zb1Jt/1rlIOAxMw01RubW0++RfWO3MZFWLc8UxvneSG9RFu4NvEvo3E/r9RHhhdVGxbWkvqr4LF1ztw+8k9AstMluYzuxTq/TeWa4SLshWpPO8FyxdwsPu/T3puISzqvicsMgSV5im2o7RmdTq2RSeWrnaiKVt7SaO6tNamri19D2stwWXsOyqUF8mXL8KEW9dN7/aaZpIISemtG/lTBQTt5AullEoTjv+yOx6NmEwFOdTW5PQxOjah8YTW5GmSarMN7Nq55kgnjXTal0l6tuEnasJm5qRncFT4/x1tI+Y909Lx3SjvprQbJN+r/y89ATLVib0oqR3buP7679J6Lc0oSfCYeEOJv7+qwltzXFje65/MmjnKPXqA7cIw43NGIivJXQrTTU315U6kT/8X/fxlGhZbwA724mJTVhqEclbCV8jEVfNmLZ/DrF5C4la+34hg6CXD+dzd8D07H44HWWj7EZCf7Ebjt3ClGq70ftVliTzZbVu6RuktMNz5Q4w6/h8DHentisJz4pQDJtiv2+G7aTNCRtlnH854bQOFI4va9qacPXRxIX6OAD8KGHg3p6K9ieMqvVpqOXmtyZ1dHc7+wZstzhtU7+5hAM3YfdDt3Lq0b55fF22dalRsbd5ehmXWdy0OTm8VHkaealhq2wpdW+S6z+TcnzI4lN/yTjNq/F2k8Zt3SwMqUL7O5QjZKiudUeTMBZSqcvxKKIW74X/iPrY8R/U/yXh4JETVv5+kWft3BJ+jlRqLR85IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBfwl8qUTZxx4lP7QAAAABJRU5ErkJggg=="
              ></img>
              <label className="inline-block md:text-base text-sm">
                Stripe
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
