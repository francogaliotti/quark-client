import React from 'react'

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const RecordedEventCard = (props) => {
  return (

    <Col md={4}>
      {/* <div key={props.news?.id}>  */}
      <Card className="my-auto card-quark " style={{ marginTop: "20px" }}>
        <Card.Img variant="top" src={props.event?.img} style={{height: "197px"}}/>
        <Card.Body>
            <h5 className="card-title">Titulo: {props.event?.title}</h5>
            <p className="card-text">Fecha: {new Date(props.event?.eventDate).toLocaleDateString("en-AU")}</p>
              <a
                target='blank'
                className="btn btn-outline-primary btn-quark"
               href={props.event.link}
              >
                Ir al evento
              </a>
        </Card.Body>
      </Card>
      {/* </div> */}
    </Col>
 
  )
}

export default RecordedEventCard
