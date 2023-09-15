import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useHistory } from 'react-router-dom';
import './MovieMadness.css';

const renderSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <div {...containerProps} className="suggestions-container">
      <div className="suggestions-list" style={{ maxHeight: '200px', overflowY: 'auto', zIndex: '2' }}>{children}</div>
    </div>
  );
};

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const API_KEY = 'ae57e943f23fd67a50f1579e4ed5e7c5';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      const data = await response.json();

      const newSuggestions = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      }));

      setSuggestions(newSuggestions);
      onSearch(searchTerm); // Call onSearch with the searchTerm
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleMovieSelected = (event, { suggestion }) => {
    event.preventDefault();
    history.push(`/movie/${suggestion.id}`); // Update the path here
  };

  const handleInputChange = (e, { newValue }) => {
    setSearchTerm(newValue);
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    try {
      const API_KEY = 'ae57e943f23fd67a50f1579e4ed5e7c5';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
      );
      const data = await response.json();

      const newSuggestions = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      }));

      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.title;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">
      {suggestion.poster_path && (
        <img
          className="suggestion-image"
          src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`}
          alt={suggestion.title}
        />
      )}
      <span className="suggestion-title">{suggestion.title}</span>
      <style jsx>{`
        .react-autosuggest__suggestion-markup {
          display: none;
        }
      `}</style>
    </div>
  );

  const inputProps = {
    placeholder: 'Enter a movie title',
    value: searchTerm,
    onChange: handleInputChange,
  };

  return (
    <div className="center-search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            inputProps={inputProps}
            suggestionsContainerProps={{
              style: {
                position: 'absolute',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: '2',
              },
            }}
            onSuggestionSelected={handleMovieSelected}
            renderSuggestion={renderSuggestion}
          />
        </div>
        <button type="submit" className="search-button">
          Search🔎
        </button>
      </form>
    </div>
  );
};

export default MovieSearch;
