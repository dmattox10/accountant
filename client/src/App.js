import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

import Colyseus from 'colyseus.js'

import Create from './components/Create'
import Join from './components/Join'
import All from './components/All'
import Game from './components/Game'
import Rejoin from './components/Rejoin'

/*
Get list of rooms, map, display list using list component. 
Click room to join, click add to create, and join, a room.
*/

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={ All } />
        <Route exact path="/create" component={ Create } />
        <Route exact path="/join" component={ Join } />
        <Route exact path="/rejoin" component={ Rejoin } />
        <Route path="/game/:id" component={ Game } />
      </div>
    </BrowserRouter>
  );
}

export default App;
