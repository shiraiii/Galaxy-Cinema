import React,{useState, useEffect, Component} from 'react';
import Loading from './pages/components/Loading';
import Homepage from './pages/components/homepage/homepage'
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTERS } from './utils/router';
import MasterLayout from './pages/components/themes/masterLayout'
import UpdateUser from './pages/admin/UpdateUser';
import CreateUser from './pages/admin/CreateUser';
import Users from './pages/admin/UsersAdmin';
import Movies from './pages/admin/MovieAdmin';
import Admin from './pages/admin/Admin';
import CreateMovie from './pages/admin/CreateMovie';
import UpdateMovie from './pages/admin/UpdateMovie';
import NotFound from './pages/components/notFound';
import Booking from './pages/components/Booking/Booking';
import UserDetails from './pages/components/userDetails/userDetails';
import Nowshowing from './pages/components/moremovie/Nowshowing';
import Upcoming from './pages/components/moremovie/Upcoming';
import IMAX from './pages/components/moremovie/IMAX';
import CreateCinema from './pages/admin/CreateCinema';
import CinemaAdmin from './pages/admin/CinemaAdmin';

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
          path: ROUTERS.ADMIN.ADMIN,
          component:<Admin></Admin>
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