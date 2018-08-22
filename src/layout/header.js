import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header>
      <h1 className="w3-center">Squares!</h1>
      <div className="w3-bar w3-white w3-padding w3-opacity-min w3-hover-opacity-off">
        <NavLink to="/play" className="w3-bar-item w3-button w3-half" activeClassName="w3-pale-green">
          Play a game!
        </NavLink>
        <NavLink to="/leaderboard" className="w3-bar-item w3-button w3-half" activeClassName="w3-pale-green">
          Leaderboard
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
