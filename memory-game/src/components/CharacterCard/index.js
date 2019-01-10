import React from "react";
import "./style.css";

function CharacterCard(props) {
  return (
    <div className={`card${props.flip ? " flip " : ""}`} aria-label="card" onClick={() => props.imageClickEvent(props.id)}>
      <div className="img-container btn">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default CharacterCard;