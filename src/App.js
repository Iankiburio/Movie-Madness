import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import MovieSearchResults from './MovieSearchResults';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/search/returnPage?" component={MovieSearchResults} />
        </Switch>
      </div>
    </Router>  );
}

export default App;
