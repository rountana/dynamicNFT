import react from "react";

export default function Jokes(props) {
  return (
    <div>
      <h1>Mokka joke part 1: {props.setup}</h1>
      <h2>part 2: {props.joke}</h2>
    </div>
  );
}
