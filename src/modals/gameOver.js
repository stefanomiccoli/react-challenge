import React, { Component } from "react";
import { Link } from "react-router-dom";
import leaderboardUtils from "../shared/PersistenceUtils";

export default class GameOverModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      nickname: ""
    };
    this.addScoreToLeaderboard = this.addScoreToLeaderboard.bind(this);
  }

  addScoreToLeaderboard = event => {
    event.preventDefault();
    leaderboardUtils.registerScore(this.state.nickname, this.props.score, this.props.elapsedTime);

    this.setState({
      submitted: true
    });
  };

  render() {
    return (
      <div className="w3-modal always-on">
        <div className="w3-modal-content w3-card-4 w3-center">
          <header className="w3-container w3-blue">
            <h1 className="">
              GAME OVER!
              <br />
              <small>
                Your score: <strong>{this.props.score}</strong>
              </small>
            </h1>
            <span onClick={this.props.onDismiss} className="w3-button w3-display-topright">
              &times;
            </span>
          </header>
          {!this.state.submitted &&
            leaderboardUtils.isEligible(this.props.score) && (
              <form className="w3-container w3-section" onSubmit={this.addScoreToLeaderboard}>
                <input
                  className="w3-input w3-border w3-margin-bottom"
                  value={this.state.nickname}
                  onChange={e => {
                    this.setState({ nickname: e.target.value });
                  }}
                  type="text"
                  placeholder="add your name to the hall of fame"
                />
                <button className="w3-button w3-block w3-green">Submit</button>
              </form>
            )}
          {this.state.submitted && (
            <div className="w3-container w3-padding-24 w3-green">
              <span>Thanks, your score has been recorded</span>
            </div>
          )}
          <footer className="w3-container w3-blue">
            <Link to="/leaderboard" className="w3-button w3-blue w3-half">
              Go to the leaderboard
            </Link>
            <button onClick={this.props.onDismiss} className="w3-button w3-blue w3-half">
              Play another game
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
