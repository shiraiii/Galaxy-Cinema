import React,{useState, useEffect} from 'react';
import Loading from './pages/components/Loading';
import Homepage from './pages/components/homepage/homepage'
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTERS } from './utils/router';
import MasterLayout from './pages/components/themes/masterLayout'
import UpdateUser from './pages/admin/User/UpdateUser'
import Users from './pages/admin/User/UsersAdmin'
import CreateUser from './pages/admin/User/CreateUser'
import Movies from './pages/admin/Movie/MovieAdmin'
import Dashboard from './pages/admin/DashBoard/Dashboard';
import CreateMovie from './pages/admin/Movie/CreateMovie';
import UpdateMovie from './pages/admin/Movie/UpdateMovie';
import NotFound from './pages/components/notFound';
import Booking from './pages/components/Booking/Booking';
import UserDetails from './pages/components/userDetails/userDetails';
import Nowshowing from './pages/components/moremovie/Nowshowing';
import Upcoming from './pages/components/moremovie/Upcoming';
import IMAX from './pages/components/moremovie/IMAX';
import CreateCinema from './pages/admin/Cinema/CreateCinema';
import CinemaAdmin from './pages/admin/Cinema/CinemaAdmin';
import CreateShowTime from './pages/admin/ShowTime/CreateShowTime';
import ShowTimeAdmin from './pages/admin/ShowTime/ShowTimeAdmin';
import BookingSeats from './pages/components/BookingSeats/bookingseats';
import Verify from './pages/components/VerifyPage/Verify';
import BookingSuccess from './pages/components/Booking/Booking-Success';

const RenderUserRouter = () => {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  useEffect(() => {
    const HandleRouteChange = () => {
      setIsLoading(true)
      setTimeout(() => {
       setIsLoading(false) 
      },1500)
    }
    HandleRouteChange()
    const unlisten = () => {
      HandleRouteChange()
    }

    return() => {
      unlisten()
    }
  },[location])
    const userRouters =[
        {
            path: ROUTERS.USER.HOME,
            component: <Homepage></Homepage> 
        },
        {
          path: ROUTERS.USER.NOWSHOWING,
          component: <Nowshowing></Nowshowing>
        },
        {
          path: ROUTERS.USER.UPCOMING,
          component: <Upcoming></Upcoming>
        },
        {
          path: ROUTERS.USER.IMAX,
          component: <IMAX></IMAX>
        },
        {
          path: ROUTERS.USER.PROFILE,
          component: <UserDetails></UserDetails>
        },
        {
          path: ROUTERS.USER.VERIFY,
          component: <Verify></Verify>
        },
        {
          path: ROUTERS.USER.BOOKINGSUCCESS,
          component: <BookingSuccess></BookingSuccess>
        },
        {
          path: ROUTERS.USER.BOOKINGSEAT,
          component: <BookingSeats></BookingSeats>
        },
        {
          path: ROUTERS.ADMIN.ADMIN,
          component:<Dashboard></Dashboard>
        },
        {
          path: ROUTERS.ADMIN.USERUPDATE,
          component: <UpdateUser></UpdateUser>
        },
        {
          path: ROUTERS.ADMIN.USERCREATE,
          component: <CreateUser></CreateUser> 
        },
        {
          path: ROUTERS.ADMIN.MOVIE,
          component: <Movies></Movies>
        },
        {
          path: ROUTERS.ADMIN.USER,
          component: <Users></Users> 
        },
        {
          path: ROUTERS.USER.BOOKING,
          component: <Booking></Booking>
        },
        {
          path: ROUTERS.ADMIN.MOVIECREATE,
          component: <CreateMovie></CreateMovie>
        },
        {
          path: ROUTERS.ADMIN.MOVIEUPDATE,
          component: <UpdateMovie></UpdateMovie>
        },
        {
          path: ROUTERS.ADMIN.CINEMACREATE,
          component: <CreateCinema></CreateCinema>
        },
        {
          path: ROUTERS.ADMIN.CINEMA,
          component: <CinemaAdmin></CinemaAdmin>
        },
        {
          path: ROUTERS.ADMIN.SHOWTIMECREATE,
          component: <CreateShowTime></CreateShowTime> 
        },
        {
          path: ROUTERS.ADMIN.SHOWTIME,
          component: <ShowTimeAdmin></ShowTimeAdmin>
        }

    ]
    if(isLoading){
      return <Loading></Loading>
    }
  return (
    <>
    <MasterLayout>
      <Routes>
        {
          userRouters.map((item, key) =>(
            <Route key={key} path={item.path} element={item.component}></Route>
          ))
        }
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </MasterLayout>
    </>
  );
}

const RouterCustom = () =>{
  return RenderUserRouter();
};
export default RouterCustom