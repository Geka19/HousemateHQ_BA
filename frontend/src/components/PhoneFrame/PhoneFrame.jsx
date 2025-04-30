// src/components/PhoneFrame.jsx
import './PhoneFrame.css';

function PhoneFrame({ children }) {
  return (
    <div className="smartphone">
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default PhoneFrame;
