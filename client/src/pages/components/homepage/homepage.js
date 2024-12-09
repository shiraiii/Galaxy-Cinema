import React from "react";
import Carousel from "../carousel/carousel";
import "./homepage.css";
import Moviesection from "../moviesection/moviesection";
import Blogsection from "../blogsection/blogsection";
import Promotion from "../promotion/promotion";
import Advertisesection from "../advertisesection/advertisesection";
import Buysection from "../buysection/buysection";
const Homepage = () => {
  return (
    <main className="Home_main_EtNt2">
      <div className="bg-secondary relative screen1200:pb-[50px] md:px-0 screen1200:pt-[25px] ">
        <div className="carousel_wrapper">
          <Carousel></Carousel>
          <Buysection></Buysection>
        </div>
      </div>
      <Moviesection></Moviesection>
      <div className="line-default"></div>
      <Blogsection></Blogsection>
      <div className="line-default"></div>
      <Promotion></Promotion>
      <Advertisesection></Advertisesection>
    </main>
  );
};

export default Homepage;
