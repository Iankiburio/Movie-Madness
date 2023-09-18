import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './upcoming.css';

function UpcomingPage() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=f4c776b1055af7aa537d751aa6f0a329')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setUpcomingMovies(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching upcoming movies:', error);
        setUpcomingMovies([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading upcoming movies...</p>;
  }

  return (
    <div>
      <Link to="/" className="home-button">Go Home</Link>
      <h2 className='upcoming'>Upcoming Movies</h2>
      <div className='movies-container'>
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className='movie-details'>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <h4 className='release'>Release Date</h4>
              <p>{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingPage;
