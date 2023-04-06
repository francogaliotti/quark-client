import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import GameJamCard from "./GameJamCard";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import errorImg from "../../images/Ups.png"
import Error from "../../components/error";

const GameJam = () => {
  const user = useSelector(selectUser);
  const [gameJam, setGameJam] = useState([]);

  async function fetchData(state) {
    setGameJam(user.moodleUserData.listaGameJams)
    console.log(gameJam)
  }

  useEffect(() => {
    fetchData(setGameJam);
  }, []);
  return (
    <Container fluid >
      <div className="mainContainer1">
        <h1 className="titular-quark">Game Jams</h1>
        <h5  className="subtitular-quark">Subtitulo</h5>
        <hr className="hr-quark" />

        {gameJam.length != 0 
          ? gameJam.map((gameJams) => <GameJamCard gameJam={gameJams} />)
          : <> 
            <Error></Error>
          </>}

        <div
          className="buscador"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div className="divBottones" style={{ padding: "20px" }}>
            <button className="futureEvents">Atras</button>
            <button className="recordedEvents clicked">Siguiente</button>
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default GameJam;
