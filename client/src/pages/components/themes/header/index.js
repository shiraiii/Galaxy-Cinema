import React, { useContext, useEffect } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "../header/style.css";
import "../../../../../src/index.css";
import LoginModal from "../../Modal/loginModal";
import Sidenav from "../../sidenav/sidenav";
import SignUp from "../../Modal/signup";
import DataUser from "../../data-user/dataUser";
import HeaderNavigator from "./header-navigator";
import AppContext from "../../../../context/AppContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import HeaderMoreInfo from "./header-moreInfo";
import OverSeatNumber from "../../Modal/overSeatNumber";

dayjs.extend(utc);
dayjs.extend(timezone);

const Header = () => {
  const {
    state,
    dispatch,
    showLoginModal,
    setShowLoginModal,
    showSignUp,
    setShowSignUp,
    showSideNav,
    setShowSideNav,
    redirectPath,
    setRedirectPath,
    overSeats,
    setOverSeats,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { user } = state;
  const SignOut = () => {
    sessionStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch({ type: "CURRENT_USER", payload: null });
    window.location.reload();
    useEffect(() => {
      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      }
    }, [redirectPath, setRedirectPath]);
  };

  const closeIcon = (
    <span className="inline-flex bg-[#ececec] rounded-full w-[24px] h-[24px] items-center justify-center">
      <img
        src="https://www.galaxycine.vn/_next/static/media/icon-close.7e22f021.svg"
        width="30"
        height="30"
        className="w-[12px] h-[12px]"
        style={{ color: "transparent" }}
      ></img>
    </span>
  );

  return (
    <>
      <header className="Header_header_iG0T4 pt-5 pb-2 lg:pt-3">
        {showSideNav && (
          <div className="bg-[#343a40] opacity-60 fixed top-0 right-0 bottom-0 left-0 z-[1020] overflow-hidden w-screen h-screen transition-all duration-500 ease-in-out  screen:1200:hidden"></div>
        )}
        <div className="my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 screen1200:max-w-6xl lg:max-w-4xl md:max-w-4xl lg:px-0 md:px-4 sm:px-[45px] px-[16px]">
          <nav className="flex justify-start justify-items-center items-center flex-row">
            <a
              className="header-logo logo__header grow-0 md:mr-[40px] mr-[20px] "
              href={"/"}
            >
              <img
                style={{ width: 115, height: 60 }}
                className="max-w-min w-[77px] h-[40px] lg:w-[115px] lg:h-[60px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                alt="Galaxy - Cinema"
                src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png"
              ></img>
            </a>
            <a className="screen1200:hidden grow text-left block mr-4">
              <img
                className="max-w-min w-[84px] h-[27px] lg:w-[112px] lg:h-[36px] object-cover duration-500 ease-in-out group-hover:opacity-100 "
                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
              ></img>
            </a>
            <HeaderNavigator></HeaderNavigator>
            <div className="hidden screen1200:flex screen1200:grow screen1200:basis-6/12 screen1200:justify-end uppercase items-center relative transition-all duration-300">
              <div className="search-icon mr-4">
                <a
                  className="cursor-pointer font-light text-sm text-[#777]"
                  title="Tìm kiếm"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </a>
              </div>
              {user ? (
                <>
                  <DataUser signOut={SignOut}></DataUser>
                </>
              ) : (
                <HeaderMoreInfo></HeaderMoreInfo>
              )}
            </div>
            <div className="flex md:grow md:basis-6/12 justify-end screen1200:hidden">
              {!user ? (
                <a className="text-sm text-[#777] capitalize cursor-pointer transition-all duration-300 hover:text-[#f26b38]">
                  <span onClick={() => setShowLoginModal(true)}>
                    <i className="fa-regular fa-user inline align-baseline mr-1"></i>
                    Đăng nhập
                  </span>
                </a>
              ) : (
                <DataUser></DataUser>
              )}
              <button className="ml-4">
                <span onClick={() => setShowSideNav(true)}>
                  <i className="fa-solid fa-bars"></i>
                </span>
              </button>
            </div>
          </nav>
        </div>
        {showSideNav && (
          <Sidenav
            user={user}
            signOut={SignOut}
            OnClose={setShowSideNav}
          ></Sidenav>
        )}
      </header>
      <Modal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        closeIcon={closeIcon}
        classNames={{
          modal: "modal-sx px-6 py-10 m-0",
        }}
        closeOnOverlayClick={false}
      >
        <LoginModal />
      </Modal>

      <Modal
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        closeIcon={closeIcon}
        classNames={{
          modal: "modal-sx px-6 py-10 m-0",
        }}
        closeOnOverlayClick={false}
      >
        <SignUp />
      </Modal>

      <Modal
        open={overSeats}
        onClose={() => setOverSeats(false)}
        showCloseIcon={false}
        classNames={{ modal: "modal-375 texdt-center p-10" }}
        closeOnOverlayClick={false}
      >
        <OverSeatNumber />
      </Modal>
    </>
  );
};

export default memo(Header);
