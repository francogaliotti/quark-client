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
import MasterViewCourseCard from "./MasterViewCourseCard";
const MasterViewCard = ({courseData, level}) => {
  return (
    <div className=" card card-quark quark-masterview-card ">
      <div className="acHeader d-flex justify-content-between quark-title-action">
        <h5>{level}</h5>
        <h5
          className="btn btn-primary btn-quark disabled"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Adquirido{" "}
        </h5>
      </div>
      
      {courseData != null ? (courseData.map(element => {return <MasterViewCourseCard course={element}></MasterViewCourseCard>})):("")}
    </div>
  );
};

export default MasterViewCard;
