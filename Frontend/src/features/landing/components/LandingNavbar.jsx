import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const LandingNavbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/');
  };

  return (
    <header className="landing-nav">
      <Link to="/" className="landing-nav__brand">
        <div className="brand-icon">✈️</div>
        <div className="brand-text">Resume<span>Pilot</span></div>
      </Link>

      <nav className="landing-nav__links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#preview">Platform Preview</a>
      </nav>

      <div className="landing-nav__actions">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-btn nav-btn--primary">
              Launch App
            </Link>
            <button onClick={onLogout} className="nav-btn nav-btn--ghost">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn nav-btn--ghost">
              Login
            </Link>
            <Link to="/register" className="nav-btn nav-btn--primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
