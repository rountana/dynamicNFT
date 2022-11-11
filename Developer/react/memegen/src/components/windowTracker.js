import React from "react";

// When window is resized the window.innerWidth property is updated inside the window

export default function WindowTracker() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  //this event listener is registered with the DOM, so if the
  //WindowTracker component isn't loaded, this creates a memory leak
  //the browser is listening to an unmounted event

  React.useEffect(() => {
    window.addEventListener("resize", function () {
      // console.log("Resized")
      setWindowWidth(window.innerWidth);
    });
  }, []);

  // with cleanup
  //   React.useEffect(() => {
  //     function watchWidth() {
  //         console.log("Setting up...")
  //         setWindowWidth(window.innerWidth)
  //     }

  //     window.addEventListener("resize", watchWidth)

  //     return function() {
  //         console.log("Cleaning up...")
  //         window.removeEventListener("resize", watchWidth)
  //     }
  // }, [])

  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  //   React.useEffect(() => {
  //     async function getMemes() {
  //       const res = await fetch("https://api.imgflip.com/get_memes");
  //       const data = await res.json();
  //       setAllMemes(data.data.memes);
  //     }
  //     getMemes();
  //   }, []);

  return <h1>Window width: {windowWidth}</h1>;
}
