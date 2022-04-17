import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import './index.css';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { getItem } from './utils/storage';


function ProtectedRoutes({ redirectTo }) {
  const autorization = getItem('token');

  return autorization ? <Outlet /> : <Navigate to={redirectTo} />

}

function MainRoutes() {

  return (
    <div className="container">

      <Routes>
        
        <Route path='/'>
          <Route path='/' element={<SignIn />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Route>
        <Route path='/'>
          <Route path='/sign-up' element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoutes redirectTo='/' />}>
          <Route path='/home' element={<Home />} />
        </Route>

      </Routes>

    </div>
  );
}

export default MainRoutes;
