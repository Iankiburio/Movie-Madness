import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

function UpcomingPage() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=f4c776b1055af7aa537d751aa6f0a329')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setUpcomingMovies(data.results);
        }
      })
      .catch((error) => {
        console.error('Error fetching upcoming movies:', error);
        setUpcomingMovies([]);
      });
  }, []);

  return (
    <div>
      <h2 className='upcoming'>Upcoming Movies</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingPage;
