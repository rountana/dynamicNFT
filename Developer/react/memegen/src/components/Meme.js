import React from "react";
import memesData from "../memesData";

export default function Meme() {
  //fetch the memes from internal data file
  function getMeme() {
    const memesArray = memesData.data.memes;
    var getArrayElement =
      memesArray[Math.floor(Math.random() * memesArray.length)];
    console.log(getArrayElement);
  }

  return (
    <div className="memecontainer">
      <form className="memeform">
        <input
          className="memetext"
          type="text"
          placeholder="top text.."
        ></input>
        <input
          className="memetext"
          type="text"
          placeholder="bottom text.."
        ></input>
      </form>
      {/* note onclick event function getmeme. If we pass the function
      as getMeme() it's called at first pass - when button is rendered.
      to make it truly a callback pass it as a variable.  */}
      <div className="memeoutput">
        <button className="memebutton" onClick={getMeme}>
          Get new meme image
        </button>
        <img className="memeimage" />
      </div>
    </div>
  );
}
