import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar.js";

const rating = "5.0";
const reviewCount = 6;
const country = "United States";
const title = "Life Lessons with Katie Zaferes";
const price = "136";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* export default function App() {
            // <Hero />
    return ( */}
      <div>
        <Navbar />
        <Card
          img="katie-zaferes.png"
          rating={rating}
          reviewCount={reviewCount}
          country={country}
          title={title}
          price={price}
        />
      </div>
    </div>
  );
}

export default App;
