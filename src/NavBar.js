import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/upcoming">Upcoming</Link>
      </li>
      <li>
        <Link to="/new-releases">New Releases</Link>
      </li>
      <li>
        <Link to="/watchlist">My Watchlist</Link>
      </li>
    </ul>
  );
}

export default NavBar;
