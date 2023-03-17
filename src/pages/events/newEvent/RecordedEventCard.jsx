import React from 'react'

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const RecordedEventCard = (props) => {
  return (
    <Col md={4}>
      <div key={props.event?.id}>
        <Card
          border="info"
          bg="light"
          className="col-12"
          style={{ marginTop: "20px" }}
        >
          <a href={props.event.link} style={{ textDecoration: "none" }}>
            <Card.Img variant="top" src={props.event?.img} />
          </a>
          <Card.Body>
            <Card.Title>
              <h5 style={{ color: "#91D3FF" }}>{props.event?.title}</h5>
            </Card.Title>
            <Card.Text>
              <p style={{ color: "#588CAF" }}>{props.event?.eventDate}</p>
            </Card.Text>
            
          </Card.Body>
        </Card>
      </div>
    </Col>
  )
}

export default RecordedEventCard
