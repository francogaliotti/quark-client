import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
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
              variant="top"
              src={user.userBasicDatum.imgUrl}
              alt="Imagen de la tarjeta"
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
        <a className="btn btn-outline-primary btn-quark">Completa tu perfil</a>
      </Card.Footer>
    </Card>
  );
};
