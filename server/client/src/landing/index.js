import React from "react";
import CatAnimation from "./catAnimation/night/catAnimation";
import DayAnimation from "./catAnimation/day/dayAnimation";
import Navbar from "./navbar/navbar";
import "./landing.css";

const Landing = () => {
return(
    <div className="main">
        <Navbar />
         {/* <CatAnimation /> */}
        <DayAnimation />
    </div>
);
}


export default Landing;