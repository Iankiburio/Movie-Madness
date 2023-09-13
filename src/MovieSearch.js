import React, { useState } from 'react';
import './MovieMadness.css';

const MovieSearch = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={searchInput}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Search🔎 </button>
    </form>
  );
};

export default MovieSearch;

