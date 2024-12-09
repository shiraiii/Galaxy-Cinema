import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Moremovie = ({ number }) => {
  const [lists, setLists] = useState([]);
  const [activeIndex, setActiveIndex] = useState(number);

  useEffect(() => {
    fetch("/api/movieCats")
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex w-full md:justify-start justify-between gap-5 items-center mb-10">
      <div className="flex">
        <div className="hidden md:block">
          <span className="border-l-4 border-solid border-[#034EA2] mr-2 "></span>
          <h1 className="mr-10 text-xl font-bold not-italic uppercase inline">
            Phim
          </h1>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul className="flex mb-0 list-none flex-wrap flex-row">
              {lists.map((list, index) => {
                return (
                  <li
                    key={index}
                    className="-mb-px mr-3 md:mr-8 text-[#333333] last:mr-0 flex-auto text-center transition-all duration-300 cursor-pointer ease-in-out relative"
                  >
                    <Link
                      className={
                        activeIndex === index
                          ? "md:text-base screen360:text-sm text-[12px] font-bold not-italic block leading-normal hover:text-[#034EA2] transition-all duration-300 ease-in-out cursor-pointer relative text-[#034EA2] tab__active opacity-100 "
                          : "md:text-base screen360:text-sm text-[12px] font-bold not-italic block leading-normal hover:text-[#034EA2] transition-all duration-300 ease-in-out cursor-pointer text-[#333333] relative opacity-50"
                      }
                      onClick={() => handleClick(index)}
                      to={`/${list.path}`}
                    >
                      {list.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <a className="text-[#034EA2] cursor-pointer md:text-base screen360:text-[12px] text-sm">
        <i className="fa-solid fa-location-crosshairs"></i>
        <span className="inline-block ml-1">Toàn quốc</span>
      </a>
    </div>
  );
};

export default Moremovie;
