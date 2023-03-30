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

const MasterViewCard = ({courseData, level}) => {
  return (
    <div className=" card card-quark quark-masterview-card courses disabled">
      <div className="acHeader d-flex justify-content-between quark-title-action">
        <h5>{level}</h5>
        <h5
          className="btn btn-primary btn-quark disabled"//aca pone algo
          style={{ cursor: "pointer" }}
        >
          {" "}
          Adquirido{" "}
        </h5>
      </div>
      <div className="courses">
      {courseData != null ? (courseData.map((element) => {return <SingleCourse course={element}/>})):("")}
      </div>
      
    </div>
  );
};

export default MasterViewCard;
