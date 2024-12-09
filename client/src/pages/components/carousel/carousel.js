import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./carousel.css";

const Carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    autoplay: true,
    lazyLoad: true,
    centerPadding: "200px",
    autoplayspeed: 2000,
    responsive: [
      {
        breakpoint: 1389,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          mobileFirst: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          mobileFirst: true,
          centerMode: false,
        },
      },
    ],
    appendDots: (dots) => (
      <div
        className="slick-dots button__bar bannder"
        style={{ padding: "10px" }}
      >
        <ul style={{ marginTop: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div style={{ width: "10px", height: "10px" }}></div>,
  };

  const [slideImgs, setSlideImgs] = useState([]);
  useEffect(() => {
    fetch("/api/slideImg")
      .then((res) => res.json())
      .then((data) => setSlideImgs(data));
  }, []);

  return (
    <Slider className="md:block " {...settings}>
      {slideImgs?.map((slideImg, index) => {
        return (
          <a key={index}>
            <img
              key={index}
              width={"1360"}
              height={"450"}
              className="px-0 md:px-0  md:block screen1440:px-6 screen1200:px-6 w-full h-full object-cover duration-500 ease-in-out group-hover:opacity-75 w-auto h-auto object-fill aspect-auto"
              color="transparent"
              src={slideImg?.ref}
              alt={slideImg?.alt}
            ></img>
          </a>
        );
      })}
    </Slider>
  );
};

export default Carousel;
