import React from "react";

const UserInfo = ({ data }) => {
  return (
    <>
      <div className="md:col-span-2 lg:col-span-1">
        <div className="bg-white px-6 md:p-4 xl:px-6 xl:py-4 xl:shadow-2xl rounded mb-8">
          <div className="pt-4 pb-6 xl:border-b border-[#ECECEC] flex justify-center items-center">
            <div className="flex items-center">
              <div className="w-[72px] h-[72px] leading-[62px] text-center rounded-full bg-[#D0D0D0] border-4 border-solid border[#E9E9E2]">
                <img
                  alt="Camera"
                  width={20}
                  height={20}
                  className="inline-block w-[20px] h-[20px] object-cover duration-500 ease-in-out group-hover:opacity-100"
                  src="https://www.galaxycine.vn/_next/static/media/camera.af597ff8.png"
                ></img>
              </div>
              <div className="flex flex-col flex-auto">
                <div className="flex items-start gap-[6px]">
                  <img
                    alt="Logo Star Mini"
                    src="https://cdn.galaxycine.vn/media/2020/5/15/s_1589511977688.png"
                    className="inline-block w-[20px] height-[30px]"
                    color="transparent"
                  ></img>
                  <p className="text-[18px] font-bold not-italic leading-[1.25rem]">
                    {data?.userName}
                  </p>
                  <span className="block text-xs font-light not-italic"></span>
                </div>
                <div className="flex items-center gap-3"></div>
              </div>
            </div>
          </div>
          <div className="info__money__rating py-6 xl:border-b border-[#ECECEC]"></div>
          <div className="info__support border-0"></div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
