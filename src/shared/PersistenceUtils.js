
const LEADERBOARD_STORE = 'leaderboard';

const leaderboardUtils = {

  isEligible: (score) => {
    if (!score) return false;
    let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_STORE)) || [];
    const beatenIndex = leaderboard.findIndex(x => x.score < score);
    return beatenIndex >= 0 || leaderboard.length < 10;
  },

  /**
   * Add a new record in the leaderboard
   * @param nickname: name of the current user
   * @param score: int the reached level
   * @param elapsedTime: int the game duration (in milliseconds)
   */
  registerScore: (nickname, score, elapsedTime) => {
    let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_STORE)) || [];
    // returns the index of the first top-10 records with lower score than current (or same score achieved in longer time)
    const beatenIndex = leaderboard.findIndex(x => 
      x.score < score || (x.score === score && x.elapsedTime > elapsedTime)
    );
    let insertToIndex;
    if (beatenIndex >= 0) {
      // found a player in the top 10 with lower score, add current before it
      insertToIndex = beatenIndex;
    } else if (leaderboard.length < 10) {
      // not found but leaderboard has less than 10 scores, add it to the end
      insertToIndex = leaderboard.length;
    } else {
      // altough we should not reach this point, check anyway for unhandled cases
      return;
    }

    leaderboard.splice(insertToIndex, 0, {
      nickname: nickname,
      score: score,
      date: new Date().getTime(),
      elapsedTime: elapsedTime
    });
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem(LEADERBOARD_STORE, JSON.stringify(leaderboard));
    return leaderboard;
  },

  /**
   * Returns the list of results from the leaderboard
   */
  getScores: () => {
    const scores = localStorage.getItem(LEADERBOARD_STORE);
    return (scores) ? JSON.parse(scores) : [];
  },

  /**
   * Remove all the results
   */
  clearScores: () => {
    localStorage.removeItem(LEADERBOARD_STORE);
  }
}

export default leaderboardUtils;