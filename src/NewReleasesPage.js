import React, { useState, useEffect } from 'react';

function NewReleasesPage() {
  const [newReleasesMovies, setNewReleasesMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f4c776b1055af7aa537d751aa6fa329&language=en-US&page=1&region=US')
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setNewReleasesMovies(data.results);
        } else {
          setNewReleasesMovies([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching new releases movies:', error);
        setError('An error occurred while fetching new releases.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>New Releases</h2>
      <ul>
        {newReleasesMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewReleasesPage;
