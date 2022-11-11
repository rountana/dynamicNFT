import react from "react";
import Image from "../images/airbnb-logo.png";

export default function Navbar() {
  return (
    <div>
      <nav>
        <img src={Image} className="Nav--log" />
      </nav>
    </div>
  );
}
