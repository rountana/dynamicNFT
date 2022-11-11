import React from "react";

export default function App() {
  /**
   * Challenge: Set up state to track our count (initial value is 0)
   */
  const [counter, setCounter] = React.useState(0);

  function incrementCount() {
    // var tempCounter = counter;
    // tempCounter = tempCounter + 1;
    // console.log(tempCounter);
    setCounter((prevCount) => prevCount + 1);
  }

  function decrementCount() {
    var tempCounter = counter;
    tempCounter = tempCounter - 1;
    // console.log(tempCounter);
    setCounter(tempCounter);
  }

  return (
    <div className="counter">
      <button className="counter--minus" onClick={decrementCount}>
        –
      </button>
      <div className="counter--count">
        <h1>{counter}</h1>
      </div>
      <button className="counter--plus" onClick={incrementCount}>
        +
      </button>
    </div>
  );
}
