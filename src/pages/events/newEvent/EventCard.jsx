import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Col from "react-bootstrap/Col";
import Alert from "../../../services/alertService";
import { postPrivate } from "../../../services/apiService";

const EventCard = (props) => {
  
  return (
    <Col md={4}>
      {/* <div key={props.news?.id}>  */}
      <Card className="my-auto card-quark " style={{ marginTop: "20px" }}>
        <Card.Img variant="top" src={props.news?.img} />
        <Card.Body>
            <h5 className="card-title">{props.news?.title}</h5>
            <p className="card-text">Fecha: {new Date(props.news?.eventDate).toLocaleDateString("en-AU")}</p>
              <button
                className="btn btn-outline-primary btn-quark"
                onClick={()=>{props.enrollUser(props.news.id)}}
              >
                Inscribirme
              </button>
        </Card.Body>
      </Card>
      {/* </div> */}
    </Col>
  );
};

export default EventCard;
