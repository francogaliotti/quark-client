import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Col from "react-bootstrap/Col";
import Alert from "../../../services/alertService";
import { postPrivate } from "../../../services/apiService";

const EventCard = (props) => {
  
  return (
    <Col md={4}>
      <div key={props.news?.id}> 
      <Card border="info" bg="light" className="col-12"  style={{marginTop:"20px"}}>
        <Card.Img variant="top" src={props.news?.img} />
        <Card.Body>
          <Card.Title>
            <h5 style={{ color: "#91D3FF" }}>{props.news?.title}</h5>
          </Card.Title>
          <Card.Text>
            <p style={{ color: "#588CAF" }}>{props.news?.eventDate}</p>
          </Card.Text>
          <Button variant="info" onClick={()=>{props.enrollUser(props.news.id)}} >Inscribirme</Button>
        </Card.Body>
      </Card>
      </div>
    </Col>
  );
};

export default EventCard;
