import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import MovieSearch from './MovieSearch';

function MovieSearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { returnPage } = useParams();

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get("query");
    fetchMovies(searchQuery);
  }, []);

  const fetchMovies = (searchInput) => {
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
              setMovies(moviesWithUpdatedData || []);
              setLoading(false);
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

  const handleSearch = (searchInput) => {
    history.push(`/search/:${encodeURIComponent(searchInput)}`);
    fetchMovies(searchInput);
  };

  const handleGoBack = () => {
    history.push(returnPage || '/');
  };

  return (
    <div>
      <h1 className="movies">Movie Search Results</h1>
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
      <button onClick={handleGoBack} className="go-back-button">Go Back to Movie List</button>
    </div>
  );
}

export default MovieSearchResults;
