import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieMadness.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=5908eaa3`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);

  return (
    <div className="movie-details">
      <h1 className="movie-details__title">Movie Details</h1>
      {movie ? (
        <div className="movie-details__content">
          <h2 className="movie-details__heading">{movie.Title}</h2>
          <p className="movie-details__plot">{movie.Plot}</p>
          <p className="movie-details__info">Released: {movie.Released}</p>
          <p className="movie-details__info">Runtime: {movie.Runtime}</p>
          <p className="movie-details__info">Genre: {movie.Genre}</p>
          <p className="movie-details__info">Director: {movie.Director}</p>
          <p className="movie-details__info">Actors: {movie.Actors}</p>
          {/* Add any other necessary details */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="movie-details__poster"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
