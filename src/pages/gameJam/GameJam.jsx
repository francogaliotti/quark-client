import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import GameJamCard from "./GameJamCard";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import errorImg from "../../images/Ups.png"
import Error from "../../components/error";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const GameJam = () => {
  const user = useSelector(selectUser);
  const refFutureJams = useRef(null);
  const refPastJams = useRef(null);
  const [gameJam, setGameJam] = useState([]);
  const [counter, setCounter] = useState(0)
  
  async function fetchData(state) {
    setGameJam(user.moodleUserData.listaGameJams)
    
  }

  async function handleClick() {
    
    if(counter < (gameJam.length - 1)){
      setCounter(counter+1)
      console.log(counter)
      
    }else{
      console.log(gameJam.length)
      console.log("No hay mas Jams")
      
    }
    
  }

  async function handleBack() {
    
    if(counter != 0){
      setCounter(counter-1)
    }else{
      console.log("No hay mas Jams")
    }
    
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
          ? <GameJamCard gameJam={gameJam[counter]}></GameJamCard>
          : <> 
            <Error></Error>
          </>}

        <div
          className={`${gameJam.length == 0 || gameJam.length == 1 ? "displaynone" : ''}`}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={`myProfileButtons`}  style={{ padding: "20px" }} >
          <ButtonGroup>
            <Button ref={refPastJams} className="profileButton" id="presed" onClick={()=>{
              handleBack()
              refPastJams.current.id = "presed"
              refFutureJams.current.id = ""
            } } ><FontAwesomeIcon icon={faArrowLeft} className="fa-solid" /></Button>
            <Button>{counter}/{gameJam.length-1}</Button>
            <Button ref={refFutureJams} className="profileButton" onClick={()=>{
              handleClick()
              refPastJams.current.id = ""
              refFutureJams.current.id = "presed"
            }}><FontAwesomeIcon icon={faArrowRight} className="fa-solid" /></Button>
          </ButtonGroup>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GameJam;
