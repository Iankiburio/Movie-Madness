import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import './MovieMadness.css';
import NavBar from './NavBar'; // Import the NavBar component

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecentlySearched, setShowRecentlySearched] = useState(false); // New state for showing recently searched movies

  const fetchMovies = () => {
    fetch('http://www.omdbapi.com/?s=movie&apikey=5908eaa3')
      .then((response) => response.json())
      .then((data) => {
        if (data.Search && data.Search.length > 0) {
          const moviesWithPosters = data.Search.map((movie) => {
            return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=5908eaa3`)
              .then((response) => response.json())
              .then((movieData) => {
                return {
                  ...movie,
                  Poster: movieData.Poster,
                };
              });
          });

          Promise.all(moviesWithPosters)
            .then((moviesWithUpdatedPosters) => {
              setMovies(moviesWithUpdatedPosters.slice(0, 10) || []);
              setLoading(false);
            });
        } else {
          setMovies([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setMovies([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ... Rest of your code ...

  const handleSearch = (searchInput) => {
    setLoading(true);

    fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=5908eaa3`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Search API response', data);

        if (data.Response === "True") {
          const moviesWithPosters = data.Search.map((movie) => {
            return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=5908eaa3`)
              .then((response) => response.json());
          });

          Promise.all(moviesWithPosters)
            .then((moviesWithUpdatedData) => {
              console.log('Movies with updated data', moviesWithUpdatedData);
              setMovies(moviesWithUpdatedData.slice(0, 10) || []);
              setLoading(false);

              // Show recently searched movies when a search is performed
              setShowRecentlySearched(true);
            });
        } else {
          setMovies([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error searching movies:', error);
        setMovies([]);
        setLoading(false);
      });
  };

  return (
    <div>
      <NavBar showRecentlySearchedMovies={() => setShowRecentlySearched(true)} />
      <h1 className='movies'>Movies Madness</h1>
      <MovieSearch onSearch={handleSearch} />
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                <img src={movie.Poster} alt={movie.Title} className="movie-image" />
                <p className="movie-title">{movie.Title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
      
      {/* Render recently searched movies when the state is true */}
      {showRecentlySearched && (
        <div className="recently-searched">
          {/* Add your code to display recently searched movies here */}
        </div>
      )}
    </div>
  );
}

export default MovieList;

