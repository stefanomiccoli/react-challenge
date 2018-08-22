import React, { Component } from "react";
import leaderboardUtils from "../../shared/PersistenceUtils";
import ScoreList from "./list";

export default class Board extends Component {
  constructor(props) {
    super(props);
    // move to componentDidMount() if async loading is implemented
    this.state = {
      highScores: leaderboardUtils.getScores()
    };
  }

  clearLeaderboard() {
    leaderboardUtils.clearScores();
    this.setState({
      highScores: leaderboardUtils.getScores()
    });
  }

  render() {
    return (
      <div className="w3-container w3-center">
        <h1>Hall of Fame</h1>
        <ScoreList highScores={this.state.highScores} />
        <button onClick={this.clearLeaderboard.bind(this)}>Clear leaderboard</button>
      </div>
    );
  }
}
