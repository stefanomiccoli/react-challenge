import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

window.startAutoplay = timeout => {
  // avoid multiple autoplays
  if (window.autoplayInterval) return;
  const autoClick = () => {
    // get the DOM element of the right cell to be clicked
    const correctCell = document.getElementsByClassName("chosen-cell");
    if (correctCell.length) {
      correctCell[0].click();
    } else {
      // avoid infinite loops, if it can't be found in 5 attempts stop autoplay
      window.autoplayAttempts++;
      if (window.autoplayAttempts === 5) {
        window.stopAutoplay();
      }
    }
  };
  // trigger first click individually for better ux
  autoClick();
  window.autoplayAttempts = 0;
  // set interval for following clicks
  window.autoplayInterval = setInterval(autoClick, timeout || 1000);
};

window.stopAutoplay = () => {
  // stop 
  clearInterval(window.autoplayInterval);
  delete window.autoplayInterval;
};
