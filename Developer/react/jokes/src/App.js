import logo from "./logo.svg";
import "./App.css";
import Jokes from "./Jokes.js";

function App() {
  return (
    <div className="App">
      <Jokes setup="Oru oorla" joke="oru aaya irundhichaan" />
    </div>
  );
}

export default App;
