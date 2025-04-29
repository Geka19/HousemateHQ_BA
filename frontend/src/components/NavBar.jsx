import { Link } from 'react-router-dom';
import './NavBar.css';

import IconActivities from '../assets/Icon_Activities-01.svg';
import IconProfile from '../assets/Icon_Profil-01.svg';
import IconPlus from '../assets/Icon_Pluss-01.svg';
import IconSettings from '../assets/Icon_Settings-01.svg';

function NavBar() {
  return (
    <footer className="navbar">
      <Link to="/activities">
        <img src={IconActivities} alt="Activities" className="nav_icons" />
      </Link>
      <Link to="/profile">
        <img src={IconProfile} alt="Profile" className="nav_icons" />
      </Link>
      <Link to="/add-friend">
        <img src={IconPlus} alt="Add Friend" className="nav_icons" />
      </Link>
      <Link to="/settings">
        <img src={IconSettings} alt="Settings" className="nav_icons" />
      </Link>
    </footer>
  );
}

export default NavBar;
