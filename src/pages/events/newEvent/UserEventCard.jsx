import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { postPrivate } from "../../../services/apiService";

const UserEventCard = (props) => {
  

  return (
    <Col md={4}>
      {/* <div key={props.event?.id}> */}
        <Card 
          className="card-quark"
          
        >
          <a href={props.event.link} style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={props.event?.img} />
          </a>
          <Card.Body>
            <h5 className="card-title">{props.event?.title}</h5>
            <p className="card-text">Fecha: {new Date(props.event?.eventDate).toLocaleDateString("en-AU")}</p>
              <a
                className="btn btn-outline-primary btn-quark"
                onClick={()=>{props.handleDelete(props.event.id)}}
              >
                Darme de Baja
              </a>
              
            
          </Card.Body>
        </Card>
      {/* </div> */}
    </Col>
  );
};

export default UserEventCard;
