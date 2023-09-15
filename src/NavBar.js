import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="top-bar">
      <button className="nav-button">
        <Link to="/new-releases" className="nav-link">
          New Releases
        </Link>
      </button>
      <button className="nav-button">
        <Link to="/popular" className="nav-link">
          Popular
        </Link>
      </button>
      <button className="nav-button">
        <Link to="/upcoming" className="nav-link">
          Upcoming
        </Link>
      </button>
    </div>
  );
}

export default NavBar;


