import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    ButtonGroup,
    Button,
    ProgressBar,
  } from "react-bootstrap";
import { SingleCourse } from "../../components/singleCourse";

import Alert from "../../services/alertService";

const MasterViewCard = ({courseData, level, purchased}) => {
 async function handleClick(){
    Alert.info({
      title: "No disponible en la beta", 
      // message:"Con imaginacion funciona <3"
    })
 }

  return (
    <div className={`card card-quark quark-masterview-card courses ${purchased == false ? "disabled" : "" }`}>
      <div className="acHeader d-flex justify-content-between quark-title-action">
        <h5>{level}</h5>
        <button
          onClick={handleClick}
          className={`btn btn-primary btn-quark ${purchased == true ? "disabled" : "" }`}
          style={{ cursor: "pointer" }}
        >
          {purchased == true ? "Adquirido" : "Comprar" }
        </button>
      </div>
      
      <div className="courses coursesContainer">
      {courseData != null ? (courseData.map((element) => {return <div className="cardDiv"><SingleCourse course={element}></SingleCourse></div>})):("")}
      </div>
      
    </div>
  );
};

export default MasterViewCard;
