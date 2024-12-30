import React from "react";

const TrailerModal = ({ trailer }) => {
  return (
    <div className="trailer__wrapper h-[80vh]">
      <iframe
        width={"100%"}
        height={"100%"}
        src={trailer}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        className="rounded"
      ></iframe>
    </div>
  );
};

export default TrailerModal;
