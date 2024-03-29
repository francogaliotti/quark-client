import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "../../services/alertService";
import { useNavigate } from "react-router-dom";

const GameJamCard = (gameJam) => {
  const navigate = useNavigate();
  console.log(gameJam);
  async function handleClick(id) {
   navigate(`/course/${id}`)
    
    
  }

  return (
    <div key={gameJam.gameJam.id}>
      <Row md={2} className="justify-content-center g-4">
        <Col sm={8}>
          <Card className="my-auto card-quark ">
            <Card.Img variant="top" src={gameJam.gameJam.url} />
            <Card.Body>
              <h5>{gameJam.gameJam.fullName}</h5>
              <h6>{gameJam.gameJam.timestarted}</h6>
              
                <Button
                  
                  className="btn btn-outline-primary btn-quark"
                  onClick={()=>{handleClick(gameJam.gameJam.idCurso)}}
                >
                  Ir a la Game Jam
                </Button>
                
              
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={4}>
          <Card className="col-12" border="info" bg="dark">
            <Card.Header as="h5" style={{color:"#91D3FF"}}>
              Datos Importantes Sobre la GameJam
            </Card.Header>
            <Card.Body>
              <Card.Title style={{color:"#91D3FF"}}>Special title treatment</Card.Title>
              <Card.Text style={{color:"#588CAF"}}>{gameJam.gameJam.description}</Card.Text>
              <Button style={{ marginRight: "10px" ,backgroundColor:"#0B2A3F",border:"1px solid #2390B6"}}>Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default GameJamCard;
