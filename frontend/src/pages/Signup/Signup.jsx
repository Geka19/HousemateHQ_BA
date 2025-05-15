import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms to create an account.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5008/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="phone-frame" style={{ margin: '0 10%' }}>
      <h2 className="signup_headline">Create Account</h2>
      <form onSubmit={handleSubmit} className="signup_header">
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          required
          className="welcome_write_field_purple" 
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="welcome_write_field_purple"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="welcome_write_field_purple"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          className="welcome_write_field_purple"
          onChange={handleChange}
        />
        <br />

        <div style={{ margin: '1rem 0', textAlign: 'left' }}>
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />{' '}
            I agree to the terms of use — my account will be visible to others.
          </label>
        </div>

        <button type="submit" className="welcome_buttons_green">
          Create Account
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}

export default Signup;
