import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';

import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Activities from './pages/Activities/Activities';
import AddActivity from './pages/AddActivities/AddActivities';
import Friends from './pages/Friends/Friends'; 
import AddFriends from './pages/AddFriends/AddFriends';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/', '/login', '/signup']; // No footer on these pages

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme; // 'light' or 'dark'
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/add-friend" element={<AddFriends />} />
      </Routes>

      {shouldShowFooter && <NavBar />}
    </>
  );
}

export default App;
