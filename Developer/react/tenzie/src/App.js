import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Die from "./components/Die";
import "./style.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import Confetti from "react-confetti/dist/types/Confetti";

function App() {
  const [initialDice, SetInitialDice] = React.useState(initializeDice());
  const [win, SetWin] = React.useState(false);

  function initializeDice() {
    const ARRAY_LENGTH = 10;
    const Array = [];

    // plain array, has no hold status
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      Array.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return Array;
  }

  // unheld die faces replaced with random numbers
  function rollDice() {
    if (win) {
      SetInitialDice((newDice) => initializeDice());
      SetWin(false);
    } else {
      SetInitialDice((dice) =>
        dice.map((obj) => {
          return !obj.isHeld
            ? { ...obj, value: Math.ceil(Math.random() * 6) }
            : obj;
        })
      );
    }
  }

  React.useEffect(() => {
    const check = initialDice[0].value;
    var count = 0;
    initialDice.map((dice) => {
      dice.value === check && dice.isHeld ? count++ : (count = count + 0);
      console.log("check digit" + check);
      console.log("matches count" + count);
      if (count == 10) {
        SetWin(true);
        console.log("CONGRATS YOU WON!!!");
      }
    });
  }, [initialDice]);
  // for (let i = 0; i < DICE_SIZE; i++) {
  //   diceObject = {
  //     ...diceObject,
  //     value: Math.ceil(Math.random() * 6),
  //     isHeld: false,
  //   };
  //   // .push(Math.ceil(Math.random() * 6));
  // }

  // function rollDice() {
  //   SetInitialDice((prevDice) => rollTheDice());
  // }

  //mark dice as held
  function toggleStatus(id) {
    // SetInitialDice((prevDice) => prevDice.find(id));
    // SetInitialDice((dice) => {
    //   dice.find(() => (dice.id === id ? !dice.id : dice.id));
    // });
    SetInitialDice((diceArray) =>
      diceArray.map((diceObj) => {
        return diceObj.id === id
          ? { ...diceObj, isHeld: !diceObj.isHeld }
          : diceObj;
      })
    );
    console.log("state values returned: " + JSON.stringify(initialDice));
  }

  return (
    <main>
      {win && <Confetti />}
      <div>
        <h1>TENZIES</h1>
      </div>
      <br></br>
      <div className="dice--container">
        {initialDice.map((dice) => (
          <Die
            key={dice.id}
            value={dice.value}
            onHeld={dice.isHeld}
            // toggleHold={() => toggleStatus(dice.id)}
            toggleStatus={() => toggleStatus(dice.id)}
            // onClick={toggleStatus}
          ></Die>
        ))}
      </div>

      <div className="button--container">
        <button className="roll--button" onClick={rollDice}>
          {win ? <h2>NEW GAME</h2> : <h2>ROLL</h2>}
        </button>
      </div>
    </main>
  );
}

export default App;
