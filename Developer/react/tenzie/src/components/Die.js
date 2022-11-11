import React from "react";

export default function Die(props) {
  return (
    <button
      className={` ${props.onHeld ? "dice--box--selected" : "dice--box"}`}
      onClick={props.toggleStatus}
    >
      <h2>{props.value}</h2>
    </button>
  );
}
