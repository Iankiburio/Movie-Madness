import React, { useEffect, useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './MovieMadness.css';

import AppContext from './context/AppContext';

function MovieDetails() {

  const {setWatchlist,watchList}=useContext(AppContext)

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ae57e943f23fd67a50f1579e4ed5e7c5`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        document.body.className = 'custom-background';
      });

    return () => {
      document.body.className = '';
    };
  }, [id]);


    // Function to add the current movie to the watchlist
    const addToWatchlist = (movie) => {
      // const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      
      // // Check if the movie is already in the watchlist to avoid duplicates
      // if (!watchlist.some((movie) => movie.id === id)) {
      //   watchlist.push({ id, title: movie.title });
      //   localStorage.setItem('watchlist', JSON.stringify(watchlist));
      //   alert('Movie added to your watchlist!');
      // } else {
      //   alert('This movie is already in your watchlist.');
      // }
      // history.push('/watchlist');
      let found=false
      for(let i=0;i<watchList.length;i++){
        let doc=watchList[i]
        if(movie.id===doc.id){
          found=true
          break
        }
      }

      if(found ===false){
        setWatchlist((c)=>[...c,movie])
      }
      history.push('/watchlist');
    };

    console.log(watchList)

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
           <button onClick={()=>addToWatchlist(movie)}>Add to Watchlist</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
