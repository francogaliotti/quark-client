import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Col from "react-bootstrap/Col";

const EventCard = (news) => {
  return (
    <Col md={4}>
      <Card border="info" bg="light" className="col-12" key={news.news.id} style={{marginTop:"20px"}}>
        <Card.Img variant="top" src={news.news.img} />
        <Card.Body>
          <Card.Title>
            <h5 style={{ color: "#91D3FF" }}>{news.news.title}</h5>
          </Card.Title>
          <Card.Text>
            <p style={{ color: "#588CAF" }}>{news.news.eventDate}</p>
          </Card.Text>
          <Button variant="info">Inscribirme</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
