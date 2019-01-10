import React from "react";
import "./style.css";

function Score(props) {
  return (
    <div className="row">
      <div className="col-md-5 score">Score: {props.score}</div>
      <div className="col-md-2"></div>
      <div className="col-md-5 score">High Score: {props.highScore}</div>
    </div>
  )
}

export default Score;