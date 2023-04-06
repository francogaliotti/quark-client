import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import ProfProgressBar from "../profProgressBar";

export const ProfileCard = () => {
  const user = useSelector(selectUser);

  return (
    <Card className="card card-quark" id="cardIncioPerfil">
      <Card.Header>
        <Row>
          <Col md={3}>
            <Card.Img
              src={user.userBasicDatum.imgUrl}
              alt="Imagen de la tarjeta"
              style={{borderRadius: "50%"}}
            />
          </Col>
          <Col md={9}>
            <h5>{user.userBasicDatum.nickname}</h5>
            <h5>{user.moodleUserData.firstname} {user.moodleUserData.lastname}</h5>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Card.Text className="quark-code-text">{user.userBasicDatum.biography}</Card.Text>
        <hr className="border border-primary border-1 opacity-50"/>
        <ProfProgressBar type="normal" />
        <ProfProgressBar type="profesional" />
      </Card.Body>
      <Card.Footer className="text-center">
        <Link  to="/profile" className="btn btn-outline-primary btn-quark">Completa tu perfil</Link>
      </Card.Footer>
    </Card>
  );
};
