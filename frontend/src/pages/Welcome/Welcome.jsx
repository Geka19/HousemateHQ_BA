import { Link } from 'react-router-dom';
import './Welcome.css'; 
import LogoMain from '../../assets/Logo_Main-01.svg';
import SitLogo from '../../assets/react.svg';

function Welcome() {
  return (
    <div className="phone-frame">
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <header style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', height: '300px' }}>
        <div>
          <img src={SitLogo} alt="SiT logo" />
        </div>
        <div>
          <h1>Welcome to:</h1>
          <div className="welcome_logo">
            <img src={LogoMain} className="welcome_logo" />
          </div>
        </div>
        <div></div>
      </header>
      <main style={{ margin: '0 10%' }}>
        <Link to="/login">
          <button className="welcome_buttons_purple">Login</button>
        </Link>
        <Link to="/signup">
          <button className="welcome_buttons_purple">Sign up</button>
        </Link>
      </main>
    </div>
    </div>
  );
}

export default Welcome;
