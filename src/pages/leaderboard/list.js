import React from "react";

const ScoreList = props => {
  const formatInterval = millisecs => {
    var sec_num = Math.floor(millisecs / 1000);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <ul className="w3-ul w3-center">
      {props.highScores.map((record, k) => {
        const date = new Date(record.date).toLocaleDateString();
        const elapsed = formatInterval(record.elapsedTime);
        return (
          <li className="w3-display-container" key={k}>
            <span className="w3-large">
              {k + 1}. {record.nickname}
            </span>
            -
            <span>
              {record.score} points in {elapsed}
            </span>
            <br />
            <span className="w3-text-gray">{date}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ScoreList;
