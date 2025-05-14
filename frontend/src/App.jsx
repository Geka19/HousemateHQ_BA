import { Routes, Route } from 'react-router-dom';
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
import EditProfile from './pages/EditProfile/EditProfile';
import Layout from './components/Layout/Layout';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
  }, []);

  return (
    <Routes>
      {/* Routes WITHOUT footer, but inside PhoneFrame */}
      <Route element={<Layout showFooter={false} />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Routes WITH footer */}
      <Route element={<Layout showFooter={true} />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/add-friend" element={<AddFriends />} />
        <Route path="/edit" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default App;