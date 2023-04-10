import React, { useContext } from "react";
import { Game } from "../Pages/Game.jsx";
import ScoreCard from "./ScoreCard";
import { GlobalContext } from "../Context/GlobalContext";

const PreventRoute = () => {
  const { over } = useContext(GlobalContext);
  if (over) {
    setTimeout(() => {
      window.location.reload();
    }, 6000);
    return <ScoreCard />;
  }

  return <Game />;
};

export default PreventRoute;
