import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import GameJamCard from "./GameJamCard";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const GameJam = () => {
  const user = useSelector(selectUser);
  const [gameJam, setGameJam] = useState(null);

  async function fetchData(state) {
    setGameJam(user.moodleUserData.listaGameJams)
  }

  useEffect(() => {
    fetchData(setGameJam);
  }, []);

  return (
    <Container>
      <div className="mainContainer1">
        <h1 className="title">Game Jams</h1>
        <h5 className="subtitle">Subtitulo</h5>
        <hr className="line" />

        {gameJam != null
          ? gameJam.map((gameJams) => <GameJamCard gameJam={gameJams} />)
          : "No hay Nada"}

        <div
          className="buscador"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="divBottones" style={{ padding: "20px" }}>
            <button className="futureEvents">Atras</button>
            <button className="recordedEvents clicked">Siguiente</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GameJam;
