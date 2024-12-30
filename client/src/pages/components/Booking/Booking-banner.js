import React from "react";
import Modal from "react-responsive-modal";
import TrailerModal from "../Modal/TrailerModal";

const BookingBanner = ({ movies, showTrailer, setShowTrailer }) => {
  return (
    <div className="relative bg-black flex justify-center w-full h-full">
      <div className="absolute w-full h-full z-[300] bg-[#0003]"></div>
      <div className="relative h-full">
        <div className="absolute top-0 -left-[0%] z-[100]">
          <img
            alt="Blur Left"
            width={342}
            height={680}
            className="w-full lg:h-[500px] object-cover lg:block hidden"
            src="https://www.galaxycine.vn/_next/static/media/blur-left.7a4f1851.png"
            color="transparent"
          ></img>
        </div>
        <div className="relative">
          <img
            alt="Img Movie"
            width={1440}
            height={440}
            className="w-[860px] h-full md:h-full lg:h-[500px] object-fill object-cover duration-500 ease-in-out group-hover:opacity-100"
            src={movies.movieBanner}
            color="transparent"
          ></img>
          <button className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[600]">
            <img
              onClick={(e) => {
                setShowTrailer(true);
              }}
              alt="Play"
              width={64}
              height={64}
              className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
              src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
            ></img>
          </button>
        </div>
        <div className="absolute top-0 -right-[0%] z-100 lg:block hidden">
          <img
            alt="Blur Right"
            width={342}
            height={680}
            className=" w-full lg:h-[500px] object-cover "
            src="https://www.galaxycine.vn/_next/static/media/blur-right.52fdcf99.png"
            color="transparent"
          ></img>
        </div>
      </div>

      <Modal
        onClose={() => setShowTrailer(false)}
        open={showTrailer}
        classNames={{
          modal:
            "custom__modal__confirm modal-default p-0 bg-transparent w-[100%] min-w-[400px] max-w-[90vw]",
        }}
        showCloseIcon={false}
      >
        <TrailerModal trailer={movies.trailer} />
      </Modal>
    </div>
  );
};

export default BookingBanner;
