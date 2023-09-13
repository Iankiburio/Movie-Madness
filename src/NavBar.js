// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to="/add-movie">Add Movie</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
