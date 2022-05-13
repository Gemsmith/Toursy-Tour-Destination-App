import React from 'react';
import '../sass/pages/NotFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="notfound-text">
        <p className="notfound-text-title">404</p>
        <p>We couldn't find this page...</p>
      </div>

      <div className="notfound-links">
        {/* Save Button */}
        <Link to="/" type="submit" className="homeBtn">
          Go to Home
        </Link>

        {/* Reset/Clear Button */}
        <Link to="/login" type="submit" className="loginBtn">
          Login
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
