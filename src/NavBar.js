import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className="top-bar">
      <div className="left-links">
        <Link to="/upcoming">Upcoming</Link>
      </div>
      <div className="center-link">
        <Link to="/new-releases">New Releases</Link>
      </div>
      <div className="right-link">
        <Link to="/watchlist">My Watchlist</Link>
      </div>
    </div>
  );
}

export default NavBar;
