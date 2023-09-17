import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import WatchList from './WatchList';



import AppContext from './context/AppContext';

function App() {
  const [watchList,setWatchlist]=useState([])
  return (
    <AppContext.Provider value={{watchList,setWatchlist}}><Router>
    <div>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route path="/watchList" component={WatchList} />
      </Switch>
    </div>
  </Router></AppContext.Provider>  );
}

export default App;
