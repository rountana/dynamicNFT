import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Navbar />
      <Main />
    </div>
  );
}
//export default App;
