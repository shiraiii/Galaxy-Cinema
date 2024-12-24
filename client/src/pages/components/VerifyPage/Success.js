import React from "react";

const Success = () => {
  return (
    <div className="my-0 mx-auto xl:max-w-4xl lg:max-w-4xl py-10 gap-6">
      <div className="block__title-center">
        <div className="bg-white p-10 shadow-2xl rounded mb-8">
          <div className="text-center">
            <img
              alt="Img success"
              className="w-[80px] h-[80px] inline object-cover duration-500 ease-in-out group-hover:opacity-100"
              src="https://www.galaxycine.vn/_next/static/media/icon-rules.9c822007.png"
            ></img>
            <h4 className="mt-4 mb-3 font-bold text-xl text-[#333333] not-italic">
              Xác nhận mua vé thành công!
            </h4>
            <p className="font-normal text-sm not-italic text-[#333333] text-left">
              Thông tin đặt vé của bạn sẽ được gửi qua email và tin nhắn sms
              theo thông tin bạn đã cung cấp trước đó. Vui lòng kiểm tra
              email(kể cả hộp thư rác - spam / Junk Box) và tin nhắn
            </p>
            <p className="font-normal text-sm not-italic text-[#333333] text-left mt-4">
              Trường hợp bạn không được nhận email hoặc tin nhắn. Cảm phiền quý
              khách liên hệ hotline{" "}
              <a href="tel:0937880608" className="text-[#034ea2]">
                0937 880 608 (9:00 - 22:00){" "}
              </a>
              hoặc email{" "}
              <a
                className="text-[#034ea2]"
                href="mailto:ntt31035@gmail.com"
                target="_blank"
              >
                ntt31035@gmail.com
              </a>
              để nhận hỗ trợ của chúng tôi. Galaxy Cinema mong quý khách thông
              cảm vì sự bất tiện này
            </p>
            <a
              className="text-white border bg-[#f58020] rounded text-sm px-6 py-2.5 text0center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] justify-center mt-6"
              href="/"
            >
              Quay Về Trang Chủ
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center md:flex-row flex-col">
          <h3 className="text-[#111111] text-xl font-bold not-italic">
            Đặt Vé Online - Không Lo Trễ Nải
          </h3>
          <ul className="list-none md:mt-0 mt-5">
            <li className="inline-block">
              <a
                className="inline-block"
                target="_blank"
                href="https://apps.apple.com/vn/app/galaxy-cinema/id593312549"
              >
                <img
                  alt="Icon App Store"
                  className="undefiend object-cover duration-500 ease-in-out group-hover:opacity-100"
                  src="https://www.galaxycine.vn/_next/static/media/icon-ios-app-store.65ed00df.svg"
                ></img>
              </a>
            </li>
            <li className="inline-block ml-2">
              <a
                className="inline-block"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.galaxy.cinema&hl=vi&pli=1"
              >
                <img
                  alt="Icon App Store"
                  className="undefiend object-cover duration-500 ease-in-out group-hover:opacity-100"
                  src="https://www.galaxycine.vn/_next/static/media/icon-google-app-store.f4c38402.svg"
                ></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Success;
