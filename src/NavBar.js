import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [showUpcomingDropdown, setShowUpcomingDropdown] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [showNewReleasesDropdown, setShowNewReleasesDropdown] = useState(false);
  const [newReleasesMovies, setNewReleasesMovies] = useState([]);

  const fetchUpcomingMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ae57e943f23fd67a50f1579e4ed5e7c5')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setUpcomingMovies(data.results);
        } else {
          setUpcomingMovies([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching upcoming movies:', error);
        setUpcomingMovies([]);
      });
  };

  const fetchNewReleases = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ae57e943f23fd67a50f1579e4ed5e7c5')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setNewReleasesMovies(data.results);
        } else {
          setNewReleasesMovies([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching new releases movies:', error);
        setNewReleasesMovies([]);
      });
  };

  return (
    <div className="top-bar">
      <button className="nav-button" onClick={() => { setShowUpcomingDropdown(!showUpcomingDropdown); fetchUpcomingMovies(); }}>
        Upcoming
      </button>
      {showUpcomingDropdown && (
        <div className="dropdown-content">
          <ul>
            {upcomingMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="nav-button" onClick={() => { setShowNewReleasesDropdown(!showNewReleasesDropdown); fetchNewReleases(); }}>
        New Releases
      </button>
      {showNewReleasesDropdown && (
        <div className="dropdown-content">
          <ul>
            {newReleasesMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="nav-button">
        <Link to="/recently-searched">Recently Searched </Link>
      </button>
    </div>
  );
}

export default NavBar;




