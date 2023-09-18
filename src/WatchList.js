import React, { useContext } from 'react';
import AppContext from './context/AppContext';
import './upcoming.css';



const Watchlist = () => {
  const { watchList } = useContext(AppContext);

  return (
    <div>
      <h2 className='watchlist'>My Watchlist</h2>
      <ul className="movie-list">
        {watchList.map((movie, index) => (
          <li key={index} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
