import React, { useContext } from 'react';

import AppContext from './context/AppContext';

const Watchlist = () => {
  const {watchList}=useContext(AppContext)
  
  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {watchList.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
   
    </div>
  );
};

export default Watchlist;



