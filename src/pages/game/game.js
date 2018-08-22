import React, { Component } from "react";
import Grid from "./grid";
import GameOverModal from "../../modals/gameOver";
import utils from "../../shared/utils";
import "./game.scss";

export default class Game extends Component {
  startSize = 3;
  difficulty = 1;

  constructor(props) {
    super(props);
    this.state = this.resetGame(this.difficulty);
    this.onUserClick = this.onUserClick.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  /**
   * Callback for user interaction on child component Grid. 
   * Prepare next level if correct, open "Game Over" modal if wrong
   * @param selectedIndex 0-based index of the selected grid cell
   */
  onUserClick(selectedIndex) {
    if (selectedIndex === this.state.selected) {
      this.setState(this.prepareLevel(this.state.level + 1, this.state.difficulty));
    } else {
      this.setState({
        showGameOverModal: true,
        endTime: new Date()
      });
    }
  }

  closeScoreModal() {
    // on modal close, start a new game
    this.setState(this.resetGame());
  }

  changeDifficulty(event) {
    // start a new game with the updated difficulty
    const newState = this.resetGame(event.target.value);
    this.setState(newState);
  }

  resetGame(difficulty = this.state.difficulty) {
    return {
      ...this.prepareLevel(0, difficulty),
      startTime: new Date(),
      endTime: null,
      showGameOverModal: false
    };
  }

  /**
   * Prepare state values that define the level (grid size, colors, index of correct cell...)
   */
  prepareLevel(level, difficulty) {
    const baseColor = utils.getRandomColor();
    const gridSize = this.startSize + level;
    // coefficient for luminance & saturation shifting, weighted on difficuly
    // (higher difficulty -> lower difference in colors)
    const factor = 40 / difficulty;
    return {
      difficulty: difficulty,
      level: level,
      baseColor: baseColor,
      selectedColor: utils.getColorVariation(baseColor, factor),
      selected: utils.getRandomValue(0, gridSize * gridSize - 1)
    };
  }

  render() {
    return (
      <div className="game-board">
        <div className="select-difficulty w3-block">
          <div className="w3-row">
            <div className="w3-col" style={{ width: "150px" }}>
              <button className="w3-button" onClick={() => window.startAutoplay(1000)}>
                cheat ON
              </button>
              <br />
              <button className="w3-button" onClick={() => window.stopAutoplay()}>
                cheat OFF
              </button>
            </div>
            <div className="w3-rest">
              <label>Choose the difficulty</label>
              <select className="w3-rest w3-select" name="option" value={this.state.difficulty} onChange={this.changeDifficulty}>
                <option value="1">Beginner</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
                <option value="5">Eagle eye</option>
              </select>
            </div>
          </div>
        </div>
        <Grid size={this.startSize + this.state.level} selected={this.state.selected} baseColor={this.state.baseColor} selectedColor={this.state.selectedColor} onSelect={this.onUserClick} />
        {this.state.showGameOverModal && <GameOverModal onDismiss={this.closeScoreModal.bind(this)} score={this.state.level} elapsedTime={new Date() - this.state.startTime} />}
      </div>
    );
  }
}
