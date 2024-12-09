import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Header from "../header";
import Footer from "../footer";
import { AppReducer } from "../../../../reducer/AppReducer";
import AppContext from "../../../../context/AppContext";
import axios from "axios";
import manageToken from "../../../../utils/manageToken";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { filterAndSortMovies } from "../../../../utils/movieUtils";
import "react-responsive-modal/styles.css";

dayjs.extend(utc);
dayjs.extend(timezone);
const MasterLayout = ({ children, ...props }) => {
  const initialState = { user: null };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showEmptySeatModal, setShowEmptySeatModal] = useState(false);
  const [menus, setMenus] = useState([{}]);
  const [movies, setMovies] = useState([{}]);
  const [cinemas, setCinemas] = useState([{}]);
  const [isAuth, setIsAuth] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [showtimes, setShowtimes] = useState([{}]);
  const [overSeats, setOverSeats] = useState(false);
  const SEATLIMIT = 2;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, moviesRes, cinemasRes, showtimesRes] =
          await Promise.all([
            fetch("/api/menus").then((res) => res.json()),
            fetch("http://localhost:5000/api/v1/movie/getAllMovie").then(
              (res) => res.json()
            ),
            fetch("http://localhost:5000/api/v1/cinema/getAllCinema").then(
              (res) => res.json()
            ),
            fetch("http://localhost:5000/api/v1/showtime/getAllShowtime").then(
              (res) => res.json()
            ),
          ]);
        setMenus(menusRes);
        setMovies(moviesRes);
        setCinemas(cinemasRes);
        setShowtimes(showtimesRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "GET",
        url: "/api/v1/auth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      if (response.data.data.user) {
        const { userName } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName } });
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);
  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);
  useEffect(() => {
    const cleanup = manageToken();
    return () => cleanup();
  }, []);

  const today = dayjs()
    .tz("Asia/Ho_Chi_Minh")
    .startOf("day")
    .format("YYYY-MM-DD");

  const nowShowingMovies = useMemo(
    () => filterAndSortMovies(movies, today, "nowShowing"),
    [movies, today]
  );
  const upcomingMovies = useMemo(
    () => filterAndSortMovies(movies, today, "upcoming"),
    [movies, today]
  );
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        showModal,
        setShowModal,
        showLoginModal,
        setShowLoginModal,
        showSignUp,
        setShowSignUp,
        showSideNav,
        setShowSideNav,
        showRatingModal,
        setShowRatingModal,
        showEmptySeatModal,
        setShowEmptySeatModal,
        nowShowingMovies,
        upcomingMovies,
        movies,
        setMovies,
        cinemas,
        setCinemas,
        showtimes,
        setShowtimes,
        menus,
        setMenus,
        isAuth,
        setIsAuth,
        redirectPath,
        setRedirectPath,
        overSeats,
        setOverSeats,
        SEATLIMIT,
      }}
    >
      <div {...props}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </AppContext.Provider>
  );
};

export default memo(MasterLayout);
