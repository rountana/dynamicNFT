import React from "react";
import boxes from "./boxes";
import Box from "./Box";

export default function App() {
  const [squares, setSquares] = React.useState(boxes);

  function toggle(id) {
    /**
     * Challenge: use setSquares to update the
     * correct square in the array.
     *
     * Make sure not to directly modify state!
     *
     * Hint: look back at the lesson on updating arrays
     * in state if you need a reminder on how to do this
     */
    // console.log(`clicked box #${id}`)

    const tempSquares = [...squares];
    tempSquares.map((squareItem) => {
      if (squareItem.id === id) {
        squareItem.on = !squareItem.on;
        setSquares(tempSquares);
        // console.log(`clicked box status ${squares}`)
      }

      // more declarative
      // return square.id === id ? {...square, on: !square.on} : square
    });

    //imperative way of writing the above function
    function toggleAlt(id) {
      setSquares((prevSquares) => {
        const newSquares = [];
        for (let i = 0; i < prevSquares.length; i++) {
          const currentSquare = prevSquares[i];
          if (currentSquare.id === id) {
            const updatedSquare = {
              ...currentSquare,
              on: !currentSquare.on,
            };
            newSquares.push(updatedSquare);
          } else {
            newSquares.push(currentSquare);
          }
        }
        return newSquares;
      });
    }

    // console.log(tempSquares)

    // console.log(tempsquares)
    // setSquares(square=> {
    //     return (...square, square.on : !square.on})
  }

  const squareElements = squares.map((square) => (
    <Box key={square.id} id={square.id} on={square.on} toggle={toggle} />

    // if we did this below
    // toggle={() => toggle(square.id)}
    // id={square.id} can be avoided
    // instead
    // Box.js can call toggle function directly like so:
    // onClick={props.toggle}
  ));

  return <main>{squareElements}</main>;
}
