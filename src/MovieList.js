import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import './MovieList.css'; // Import CSS file

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBackgroundImage, setShowBackgroundImage] = useState(true); // Add state variable

  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=ae57e943f23fd67a50f1579e4ed5e7c5')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const moviesWithPosters = data.results.map((movie) => {
            return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae57e943f23fd67a50f1579e4ed5e7c5`)
              .then((response) => response.json())
              .then((movieData) => {
                return {
                  imdbID: movieData.id,
                  Title: movieData.title,
                  Poster: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`,
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

  const handleSearch = (searchInput) => {
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae57e943f23fd67a50f1579e4ed5e7c5&query=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Search API response', data);

        if (data.results && data.results.length > 0) {
          const moviesWithPosters = data.results.map((movie) => {
            return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae57e943f23fd67a50f1579e4ed5e7c5`)
              .then((response) => response.json());
          });

          Promise.all(moviesWithPosters)
            .then((moviesWithUpdatedData) => {
              console.log('Movies with updated data', moviesWithUpdatedData);
              setMovies(
                moviesWithUpdatedData.map((movieData) => ({
                  imdbID: movieData.id,
                  Title: movieData.title,
                  Poster: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`,
                }))
              );
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
    <div className="movie-list-container">
      <div className={`space-below-title ${showBackgroundImage ? 'show-image' : ''}`}> {/* Conditionally add 'show-image' class */}
        <h1 className="movies">Movie Madness</h1>
      </div>
      <MovieSearch onSearch={handleSearch} />
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <Link
                to={`/movie/${movie.imdbID}`}
                className="movie-link"
                onClick={() => {
                  history.push(`/movie/${movie.imdbID}`); // Use history.push() to navigate
                  setShowBackgroundImage(false);
                }}
              >
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

