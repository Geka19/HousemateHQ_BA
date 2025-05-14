// src/layout/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import PhoneFrame from '../PhoneFrame/PhoneFrame';
import NavBar from '../NavBar/NavBar';

function Layout({ showFooter = true }) {
    return (
      <PhoneFrame>
        <Outlet />
        {showFooter && <NavBar />}
      </PhoneFrame>
    );
  }
  

export default Layout;
