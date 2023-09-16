import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieMadness.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f4c776b1055af7aa537d751aa6f0a329`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        document.body.className = 'custom-background';
      });

    return () => {
      document.body.className = '';
    };
  }, [id]);

  return (
    <div className="movie-details">
      <h1 className="movie-details__title">Movie Details</h1>
      {movie ? (
        <div className="movie-details__content">
          <h2 className="movie-details__heading">{movie.title}</h2>
          <p className="movie-details__plot">{movie.overview}</p>
          <p className="movie-details__info">Released: {movie.release_date}</p>
          <p className="movie-details__info">Runtime: {movie.runtime} minutes</p>
          {movie.genres && (
            <p className="movie-details__info">
              Genre: {movie.genres.map((genre) => genre.name).join(', ')}
            </p>
          )}
          <p className="movie-details__info">Director: {movie.director}</p>
          {movie.cast && (
            <p className="movie-details__info">
              Actors: {movie.cast.map((actor) => actor.name).join(', ')}
            </p>
          )}
          {/* Add any other necessary details */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
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
