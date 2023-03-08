import React from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import ProfProgressBar from '../profProgressBar';

export const ProfileCard = () => {

    const user = useSelector(selectUser);

  return (
    <div className='profileCardContainer'>
        <Card>
              <Card.Img
                variant="top"
                src={user.userBasicDatum.imgUrl}
                alt="Imagen de la tarjeta"
              />
              <Card.Title>{user.moodleUserData.username}</Card.Title>
              <Card.Title>{user.moodleUserData.firstname} {user.moodleUserData.lastname}</Card.Title>
              <Card.Body>
                <Card.Text>
                  {user.userBasicDatum.biography}
                </Card.Text>               
              </Card.Body>
              <Card.Body>
              <ProfProgressBar type="normal" />
        <ProfProgressBar type="profesional" />
              </Card.Body>
              <Card.Footer>
                <Button variant="danger">Completa tu perfil</Button>
              </Card.Footer>
            </Card>
    </div>
  )
}
