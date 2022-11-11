import React from "react";
import memesData from "../memesData";

export default function Meme() {
  const [imageUrl, setImageUrl] = React.useState("");
  const [allMeme, setAllMeme] = React.useState(memesData);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  //make form state the single source of truth
  function handleChange(event) {
    setMeme((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //call api after first render only, no dependencies
  // pass function inside useEffect function
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json)
      .then((data) => setAllMeme(data.data.memes));
    // console.log(allMeme);
  }, []);

  // //with async await
  // React.useEffect(async () => {
  //   const res = await fetch("https://api.imgflip.com/get_memes");
  //   const data = await res.json();
  //   setAllMemes(data.data.memes);
  // }, []);

  //fetch the memes from internal data file
  function getMeme() {
    const memesArray = allMeme.data.memes;
    console.log(memesArray);
    var randomNum = Math.floor(Math.random() * memesArray.length);
    // console.log(allMeme.memes);
    // console.log(memesArray[randomNum].url);
    const url = memesArray[randomNum].url;
    // const url = "http://i.imgflip.com/1bij.jpg";
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }

  //fetch the
  return (
    <div className="memecontainer">
      <form className="memeform">
        <input
          className="memetext"
          type="text"
          placeholder="top text.."
          onChange={handleChange}
          name="topText"
        ></input>
        <input
          className="memetext"
          type="text"
          placeholder="bottom text.."
          onChange={handleChange}
          name="bottomText"
        ></input>
      </form>
      {/* note onclick event function getmeme. If we pass the function
      as getMeme() it's called at first pass - when button is rendered.
      to make it truly a callback pass it as a variable.  */}
      <div className="memeoutput">
        <button className="memebutton" onClick={getMeme}>
          Get new meme image
        </button>
        {/* <img className="memeimage" src={meme} /> */}
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  );
}
