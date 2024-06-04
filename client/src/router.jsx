import React from 'react';
import Homepage from './pages/components/homepage/homepage'
import { Route, Routes } from 'react-router-dom';
import { ROUTERS } from './utils/router';
import MasterLayout from './pages/components/themes/masterLayout'
import Moviecard from './pages/components/movie-card/moviecard';
import UpdateUser from './pages/admin/UpdateUser';
import CreateUser from './pages/admin/CreateUser';
import User from './pages/admin/Users'
import Movies from './pages/admin/Movies';
import Admin from './pages/admin/Admin';
import CreateMovie from './pages/admin/CreateMovie';
import UpdateMovie from './pages/admin/UpdateMovie';
import NotFound from './pages/components/notFound';

const renderUserRouter = () => {
    const userRouters =[
        {
            path: ROUTERS.USER.HOME,
            component: <Homepage></Homepage> 
        },
        {
          path: ROUTERS.USER.MOREMOVIE,
          component: <Moviecard></Moviecard>
        },
        {
          path: ROUTERS.ADMIN.ADMIN,
          component:<Admin></Admin>
        },
        {
          path: ROUTERS.USER.UPDATE,
          component: <UpdateUser></UpdateUser>
        },
        {
          path: ROUTERS.USER.CREATE,
          component: <CreateUser></CreateUser> 
        },
        {
          path: ROUTERS.ADMIN.MOVIE,
          component: <Movies></Movies>
        },
        {
          path: ROUTERS.USER.USER,
          component: <User></User> 
        },
        {
          path: ROUTERS.ADMIN.CREATE,
          component: <CreateMovie></CreateMovie>
        },
        {
          path: ROUTERS.ADMIN.UPDATE,
          component: <UpdateMovie></UpdateMovie>
        }
    ]
  return (
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
  );
}

const RouterCustom = () =>{
  return renderUserRouter();
};
export default RouterCustom