import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [user, setUser] = useState(null);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5008/api/users/email/${userEmail}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    fetchUser();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5008/api/users/${user._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete account');

      localStorage.removeItem('userEmail');
      navigate('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('There was a problem deleting your account.');
    }
  };

  const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  };

  if (!user) return <p>Loading settings...</p>;

  return (
    <div className="phone-frame">
      <header style={{ marginLeft: '5%' }}>
        <h1> Settings</h1>
      </header>
      <main style={{ marginLeft: '5%', marginRight: '5%',  }}>
        <ul className="settings-list">
          <li onClick={() => setShowThemeOptions(!showThemeOptions)} style={{ cursor: 'pointer' }}>
            Accessibility ▾
          </li>
          {showThemeOptions && (
            <li style={{ paddingLeft: '1rem' }}>
              <button onClick={() => setTheme('light')}>🌞 Light Mode</button>
              <button onClick={() => setTheme('dark')} style={{ marginLeft: '10px' }}>🌙 Dark Mode</button>
            </li>
          )}
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
          <li onClick={handleDeleteAccount} style={{ color: 'red', cursor: 'pointer' }}>Delete Account</li>
        </ul>
      </main>
    </div>
  );
}

export default Settings;
