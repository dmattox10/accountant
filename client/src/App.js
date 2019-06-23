import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

//import socketIOClient from "socket.io-client"

import Create from './components/Create'
import Join from './components/Join'
import All from './components/All'
import Game from './components/Game'
import Rejoin from './components/Rejoin'

/*
Get list of rooms, map, display list using list component. 
Click room to join, click add to create, and join, a room.
*/
//const socket = socketIOClient('10.0.0.158:4001')

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      endpoint: '10.0.0.158:4001',
      online: '0'
    }
    /*
    socket.on('online', (players) => {
      this.updatePlayerCount(players)
    })
    */
  }
  /*
  updatePlayerCount = (players) => {
    this.setState({
      online: players
    })
  }

  send = (command, payload) => {
    socket.emit(command, payload) // change 'red' to this.state.color
  }

  componentWillMount() {
    this.send('online')
  }
  */
  render() {
    {/*const { online } = this.state */}
    return (
      <BrowserRouter>
        <div className="App">
          {/*<div className="players"><h3>{ online } players online!</h3></div>*/}
          <Route exact path="/" component={ All } />
          <Route exact path="/create" component={ Create } />
          <Route exact path="/join" component={ Join } />
          <Route exact path="/rejoin" component={ Rejoin } />
          <Route exact path="/game" component={ Game } />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
