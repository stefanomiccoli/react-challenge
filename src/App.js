import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Header from "./layout/header";
import Game from "./pages/game/game";
import Board from "./pages/leaderboard/board";

import "w3-css/w3.css";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-container">
          <Header />
          <hr />
          <main>
            <Route exact path="/" render={() => <Redirect to="/play" />} />
            <Route path="/leaderboard" component={Board} />
            <Route path="/play" component={Game} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
