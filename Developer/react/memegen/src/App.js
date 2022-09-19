import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.js";
import Meme from "./components/Meme.js";

function App() {
  return (
    <div>
      <Header />
      <Meme />
      <h1> Hello world meme generator!</h1>;
    </div>
  );
}

export default App;
