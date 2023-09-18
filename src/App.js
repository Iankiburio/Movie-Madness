import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import WatchList from './WatchList';
import UpcomingPage from './UpcomingPage';


import AppContext from './context/AppContext';
import TopRatedPage from './TopRatedPage';

function App() {
  const [watchList,setWatchlist]=useState([])
  return (
    <AppContext.Provider value={{watchList,setWatchlist}}><Router>
    <div>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route path="/watchList" component={WatchList} />
        <Route path="/upcoming" component={UpcomingPage} />
        <Route path="/toprated" component={TopRatedPage}/>
      </Switch>
    </div>
  </Router></AppContext.Provider>  );
}

export default App;
