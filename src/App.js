import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import NavBar from './NavBar';


function App() {
  return (
    <Router>
      <div>
      <NavBar/>
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </div>
    </Router>  );
}

export default App;
