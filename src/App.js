import "./App.scss";
import Board from "./components/Board";
import React from "react";
import anime from "animejs/lib/anime.es.js";

function App() {
  const num = 60;
  const starryNight = React.useRef(null);
  const shootingStars = React.useRef(null);
  React.useEffect(() => {
    starryNight.current = anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
    shootingStars.current = anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 800 * i,
      opacity: [
        {
          duration: 500,
          value: "1",
        },
      ],
      width: [
        {
          value: "150px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 350,
    });
  }, []);
  const randomRadius = () => {
    return Math.random() * 1.2 + 0.8;
  };
  const getRandomX = () => {
    return Math.floor(
      Math.random() *
        Math.floor(
          Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        )
    ).toString();
  };
  const getRandomY = () => {
    return Math.floor(
      Math.random() *
        Math.floor(
          Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          )
        )
    ).toString();
  };
  return (
    <div className="App">
      <Board />
      <svg id="sky">
        {[...Array(num)].map((x, y) => (
          <circle
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={y}
            className="star"
          />
        ))}
      </svg>
      <div id="shootingstars">
        {[...Array(50)].map((x, y) => (
          <div
            key={y}
            className="wish"
            style={{
              left: `${getRandomY()}px`,
              top: `${getRandomX()}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
