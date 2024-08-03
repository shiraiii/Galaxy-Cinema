import React from "react"
import download from "../../assets/img/download.gif"
import "../components/themes/masterLayout/masterlayout.css"
const Loading = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-9999">
      <div className="absolute w-full h-full bg-white top-0 left-0 opacity-50 z-9999"></div>
      <div className="absolute top-1/3 left-0 w-full text-center">
        <div className="inline-block p-8">
          <div className="inline-block text-center">
            <img
              alt="loading"
              width={100}
              height={100}
              className="inline-block"
              src={download}
              color="transparent"
            ></img>
            <div className="flex flex-row mt-4">
              <span className="Snipper_loading__title__6K0l">C</span>
              <span className="Snipper_loading__title__6K0l">h</span>
              <span className="Snipper_loading__title__6K0l">ờ</span>
              <span className="Snipper_loading__title__6K0l"> </span>
              <span className="Snipper_loading__title__6K0l">x</span>
              <span className="Snipper_loading__title__6K0l">í</span>
              <span className="Snipper_loading__title__6K0l">u</span>
              <span className="Snipper_loading__title__6K0l"> </span>
              <span className="Snipper_loading__title__6K0l">n</span>
              <span className="Snipper_loading__title__6K0l">h</span>
              <span className="Snipper_loading__title__6K0l">e</span>
              <span className="Snipper_loading__title__6K0l">.</span>
              <span className="Snipper_loading__title__6K0l">.</span>
              <span className="Snipper_loading__title__6K0l">.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
