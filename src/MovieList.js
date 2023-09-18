import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import NavBar from './NavBar';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBackgroundImage, setShowBackgroundImage] = useState(true);
  const [showRecentlySearched, setShowRecentlySearched] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=f4c776b1055af7aa537d751aa6f0a329'
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const moviesWithPosters = data.results.map((movie) => {
            return fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=f4c776b1055af7aa537d751aa6f0a329`
            )
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
              setMovies(moviesWithUpdatedPosters.slice(0, 20) || []);
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

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f4c776b1055af7aa537d751aa6f0a329&query=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Search API response', data);

        if (data.results && data.results.length > 0) {
          const moviesWithPosters = data.results.map((movie) => {
            return fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=f4c776b1055af7aa537d751aa6f0a329`
            ).then((response) => response.json());
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
      <div className={`space-below-title ${showBackgroundImage ? 'show-image' : ''}`}>
        <h1 className="movies">Movie Madness</h1>
        <NavBar/>
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
                  history.push(`/movie/${movie.imdbID}`);
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

      {showRecentlySearched && (
        <div className="recently-searched">
        </div>
      )}
    </div>
  );
}

export default MovieList;
