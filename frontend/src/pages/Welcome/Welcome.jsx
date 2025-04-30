import { Link } from 'react-router-dom';
import './Welcome.css'; 
import LogoMain from '../../assets/Logo_Main-01.svg';
import SitLogo from '../../assets/sit-logo.png';

function Welcome() {
  return (
    <div className="phone-frame">
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <header className="welcome_header" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <div>
          <img src={SitLogo} alt="SiT logo" className="sitLogo"/>
        </div>
        <div>
          <h1 className="welcome_headline">Welcome to:</h1>
          <div className="welcome_logo">
            <img src={LogoMain} className="welcome_logo" />
          </div>
        </div>
        <div></div>
      </header>
      <main className="welcome_main"style={{ margin: '0 10%' }}>
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
